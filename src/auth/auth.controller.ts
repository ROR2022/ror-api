import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
  import { ValidationPipe } from 'src/common/filters/http-exception/validation.pipe';
  import { CreateUserDto } from 'src/users/dto/create-user.dto';

  interface SignInDto {
    email: string;
    password: string;
  }
  
  @Controller('auth')
  export class AuthController {
    //eslint-disable-next-line
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
      //console.log('Inicia el login de: ', signInDto);
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req:any) {
      return this.authService.getProfile(req.user.id);
    }

    @Post('register')
    signUp(@Body(new ValidationPipe()) signUpDto: CreateUserDto) {
      //console.log('Inicia el registro de: ', signUpDto)
      return this.authService.signUp(signUpDto);
    }

    @Post('recovery')
    recovery(@Body() recoveryDto: any) {
      return this.authService.recovery(recoveryDto);
    }
  }