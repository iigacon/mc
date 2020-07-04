import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';
import {UsersService} from './users.service';
import {FormResponseNOK, FormResponseOK} from "../modal/FormResponse";
import {v4 as uuid} from 'uuid';
import admin from "firebase-admin";
import {jwtConstants} from "../auth/constants";

const jwt = require('jsonwebtoken');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://solotravel-659b4.firebaseio.com"
});

export const UserStatus = {
  Active: 0,
  WantActive: 1,
  DeActive: 2,
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Post('verify')
  async verifyFirebase(@Body() body: any) {
    let res = new FormResponseOK();
    const phoneFormat = '+84'+body.phone.substring(1);
    const user = await admin.auth().getUserByPhoneNumber(phoneFormat)
        .then(function(userRecord) {
          return userRecord.toJSON();
        });
    if(user){
      if(user['phoneNumber'] === phoneFormat && user['uid']===body.uid){
        const findUser = await this.usersService.findOne({phone: body.phone});
        if(findUser){
          findUser.status = UserStatus.Active;
          const payload = {id: findUser.id};
          const token = jwt.sign(payload, jwtConstants.secret);
          res.data = {...await this.usersService.update(findUser), ...{token, password: undefined}};
          return res;
        }
      }
    }
    res = new FormResponseNOK();
    return res;
  }

  @Post('create')
  async creatUserFirebase(@Body() createUserDto: CreateUserDto) {
    let res = new FormResponseOK();
    if(createUserDto.phone){
      const findUser = await this.usersService.findOne({phone: createUserDto.phone});
      if(!findUser){
        createUserDto.id = uuid();
        createUserDto.username = uuid();
        createUserDto.status = UserStatus.WantActive;
        const payload = {id: createUserDto.id};
        const token = jwt.sign(payload, jwtConstants.secret);
        await this.usersService.create(createUserDto);
        res.data = {...createUserDto, ...{token, password: undefined}};
        return res;
      }else{
        res = new FormResponseNOK();
        res.message = 'User exist';
        return res;
      }
    }
    res = new FormResponseNOK();
    return res;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let res = new FormResponseOK();
    const user = await this.usersService.findOne({id});
    if(user){
      res.data = user;
      return res;
    }
    res = new FormResponseNOK();
    return res;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
