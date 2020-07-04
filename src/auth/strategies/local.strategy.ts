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

  async validate(phone: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(phone, password);;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
