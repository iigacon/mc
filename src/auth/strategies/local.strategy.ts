import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import {CreateUserDto} from "../../users/dto/create-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.authService.validateUser(createUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
