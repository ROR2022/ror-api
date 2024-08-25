import { Inject, Injectable } from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { Model } from 'mongoose';
import { Verification } from './entities/verification.entity';
import { UsersService } from 'src/users/users.service';
import { IVerificationService } from './verification.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { sendRecoveryPasswordMailer } from 'src/mailer/lib/libMailer';


@Injectable()
export class VerificationService implements IVerificationService {
  constructor(
    @Inject('VERIFICATION_MODEL')
    private verificationModel: Model<Verification>,
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtService = new JwtService({
      secret: this.configService.get('JWT_SECRET'),
      signOptions: { expiresIn: this.configService.get('JWT_EXPIRES_IN') },
    });
  }

  async create(
    createVerificationDto: CreateVerificationDto,
  ): Promise<any> {
    const verification = new this.verificationModel(createVerificationDto);
    const newVerification = await verification.save();
    sendRecoveryPasswordMailer(createVerificationDto.email, +createVerificationDto.code);
    if (newVerification) {
      return { message: 'Verification created', success: true, verification: newVerification._id };
    }else{
    return { message: 'Verification not created', success: false}
    } 
  }

  async confirm(dataConfirm: any): Promise<any> {
    const { verification, code } = dataConfirm;
    //console.log('getVerificationData:',verification);
    const dataVerification:any = await this.verificationModel.findById(verification).exec();
    //console.log('dataVerification:',dataVerification);
    //comparamos el codigo de confirmacion
    if (dataVerification && dataVerification?.code === code) {
      if(dataVerification?.userId){
        //actualizamos el estado del usuario
      const updatedUser:any =await this.userService.update(dataVerification?.userId, { active: true });
      //console.log('updatedUser:',updatedUser);
      //eslint-disable-next-line
      const { password, _id,  email,username,role,active, avatar } = updatedUser;
      const payload = { email: email, username: username, role: role, id: _id };
      const access_token = await this.jwtService.signAsync(payload);
      const dataUser = { email, username, role, active, access_token, avatar };
      return { message: 'Verification confirmed', success: true, dataUser };
      }else{
        //se trata de una recuperacion de contraseña
        return { message: 'Email Verification confirmed', success: true, dataUser: { email: dataVerification.email }};
      }
      
    } else {
      return { message: 'Confirm email is incorrect', success: false };
    }
  }
  async findAll(): Promise<Verification[]> {
    return this.verificationModel.find().exec();
  }

  async findOne(id: string): Promise<Verification> {
    return this.verificationModel.findById(id).exec();
  }

  async update(
    id: string,
    updateVerificationDto: UpdateVerificationDto,
  ): Promise<Verification> {
    return this.verificationModel
      .findByIdAndUpdate(id, updateVerificationDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Verification> {
    return this.verificationModel.findByIdAndDelete(id).exec();
  }
}
