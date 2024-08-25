import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
//import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import { VerificationService } from 'src/verification/verification.service';

@Injectable()
export class AuthService {
  constructor(
    //eslint-disable-next-line
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerService: MailerService,
    private verificationService: VerificationService,
  ) {
    this.jwtService = new JwtService({
      secret: this.configService.get('JWT_SECRET'),
      signOptions: { expiresIn: this.configService.get('JWT_EXPIRES_IN') },
    });
  }

  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    const isMatchPassword = await bcrypt.compare(pass, user.password);
    if (user && isMatchPassword) {
      //eslint-disable-next-line
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<any> {
    //console.log('Continuamos con Login Data:',email,pass);
    const user:any = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    //validar que el usuario este activo
    if(!user.active){
      throw new UnauthorizedException('User not active');
    }
    const { password: passUser } = user;
    const isMatchPassword = await bcrypt.compare(pass, passUser);
    if ( !isMatchPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { email: user.email, username: user.username, role: user.role, id: user._id };
    //eslint-disable-next-line
    const dataUser= {
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
      active: user.active,
    }
    const token= await this.jwtService.signAsync(payload);
    return {
        ...dataUser,
      access_token:  token,
    };
  }

  async signUp(user: any): Promise<any> {
    console.log('Inicia Registro Data user:',user);
    const newUser:any = await this.usersService.create(user);
    //console.log('Data newUser:',newUser);
    const payload = { email: newUser.email, username: newUser.username, role: newUser.role, id: newUser._id };
    //console.log('payload:', payload)
    //eslint-disable-next-line
    const { password, ...result } = newUser._doc;
    
    const token= await this.jwtService.signAsync(payload);
    //const token='tempToken';
    //console.log('auth.service Register token: ',token);
    const dataVerification = await this.mailerService.sendMail(newUser.email,newUser._id);
    console.log('Data Verification:',dataVerification);
    const newVerification:any = await this.verificationService.create(dataVerification);
    console.log('New Verification:',newVerification);
    const dataResponse = {
      verification: newVerification._id,
    };
    if(!newVerification){
      throw new UnauthorizedException('Error creating verification');
    }
    return dataResponse
  }

  async getProfile(id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async recovery(dataRecovery:any): Promise<any> {
    const { email, verificationId, myCode, password  } = dataRecovery;
    //console.log('Data Recovery:',dataRecovery);
    const user:any = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const dataVerification = await this.verificationService.findOne(verificationId);
    if (!dataVerification) {
      throw new UnauthorizedException('Verification not found');
    }
    //console.log('codigos: ',String(dataVerification.code),String(code))
    if (String(dataVerification.code) !== String(myCode)) {
      //console.log('Verification code:',dataVerification.code);
      throw new UnauthorizedException('Invalid code');
    }
    //actualizamos el password del usuario
    const newPassword = await bcrypt.hash(password, 10);
    const updatedUser = await this.usersService.update(user._id, { password: newPassword });
    if(!updatedUser){
      throw new UnauthorizedException('Error updating password');
    }
    return { message: 'Password updated', success: true };
  }
}