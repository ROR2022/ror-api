import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
//import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.interface';
//import { MailerService } from 'src/mailer/mailer.service';
import { hash } from 'bcrypt';
//import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService implements UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    //private jwtService: JwtService,
    //private mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, role } = createUserDto;
    createUserDto.password = await hash(password, 10);
    createUserDto.active = false;
    createUserDto.role = role || 'user';
    //console.log('Creando usuario createUserDto:',createUserDto);
    const createdUser = new this.userModel(createUserDto);
    const dataNewUser:any = await createdUser.save();
    //const payload = { email: dataNewUser.email, username: dataNewUser.username, role: dataNewUser.role, id: dataNewUser._id };
    //const { password: pass, ...result } = dataNewUser;
    //dataNewUser.access_token = await this.jwtService.signAsync(payload);
    //this.mailerService.sendMail(dataNewUser.email,dataNewUser._id);
    return dataNewUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email});
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

}
