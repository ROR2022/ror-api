import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ResenasService } from './resenas.service';
//import { CreateResenaDto } from './dto/create-resena.dto';
import { UpdateResenaDto } from './dto/update-resena.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('resenas')
export class ResenasController {
  //eslint-disable-next-line
  constructor(private readonly resenasService: ResenasService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createResenaDto: any, @Request() req:any) {
    //agregar el usuario que esta creando la reseña
    const { user } = req;
    createResenaDto.idUsuario = user.id;
    return this.resenasService.create(createResenaDto);
  }

  @Get()
  findAll() {
    return this.resenasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resenasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResenaDto: UpdateResenaDto) {
    return this.resenasService.update(id, updateResenaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resenasService.remove(id);
  }
}
