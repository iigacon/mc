import {HttpCode, HttpStatus, Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {FormResponseNOK, FormResponseOK} from "../modal/FormResponse";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, phone: string): Promise<any> {
    const createdUserDto= new CreateUserDto();
    createdUserDto.phone = phone;
    // createdUserDto.password = password;
    createdUserDto.username = username;
    console.log(createdUserDto);
    const user = await this.usersService.findOne(createdUserDto);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(req: any) {
    const user = await this.usersService.findOne({phone: req.phone, password: req.password});
    if (user) {
      const payload = {id: user.id, phone: user.phone};
      const res = new FormResponseOK();
      res.data = {...user,... {access_token: this.jwtService.sign(payload), password: undefined}};
      return res;
    }
    const res = new FormResponseNOK();
    res.message = `User not exist`;
    return res;
  }

  getToken(payload: any){
    return this.jwtService.sign(payload);
  }
}
