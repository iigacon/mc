import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.id = createUserDto.id;
    user.phone = createUserDto.phone;
    user.username = createUserDto.username;
    user.fullname= createUserDto.fullname;
    user.password= createUserDto.password;
    user.gender= createUserDto.gender;
    user.description= createUserDto.description;
    user.birthday= createUserDto.birthday;
    user.avatar= createUserDto.avatar;
    user.status= createUserDto.status;
    user.fb= createUserDto.fb;
    user.zalo= createUserDto.zalo;
    user.google= createUserDto.google;
    user.twitter= createUserDto.twitter;
    user.email= createUserDto.email;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(userFilter: any): Promise<User> {
    console.log(userFilter);
    return this.usersRepository.findOne(userFilter);
  }

  async update(user: any) {
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
