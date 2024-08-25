import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerificationService } from './verification.service';
//import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { UsersService } from 'src/users/users.service';

interface VerificationConfirm {
  verificationId: string;
  code: string;
}

@Controller('verification')
export class VerificationController {
  constructor(
      //eslint-disable-next-line
    private readonly verificationService: VerificationService,
    private readonly userService: UsersService
  ) {}


  @Post('confirm')
  confirm(@Body() dataConfirm: VerificationConfirm) {
    //console.log('Controller dataConfirm:',dataConfirm);
    return this.verificationService.confirm(dataConfirm);
  }

  @Post()
  create(@Body() createVerificationDto: any) {
    //antes de continuar verificamos si el email ya esta registrado
    const user = this.userService.findOneByEmail(createVerificationDto.email);
    if(!user){
      return { message: 'Email not found', success: false };
    }
    //si no viene el codigo en el body es necesario crear uno aleatorio y agregarlo al dataBody
    if(!createVerificationDto.code){
      createVerificationDto.code = Math.floor(1000 + Math.random() * 9000).toString();
    }
    console.log('Controller createVerificationDto:',createVerificationDto);
    return this.verificationService.create(createVerificationDto);
  }

  @Get()
  findAll() {
    return this.verificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verificationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerificationDto: UpdateVerificationDto) {
    return this.verificationService.update(id, updateVerificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verificationService.remove(id);
  }
}
