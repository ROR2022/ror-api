import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MemeService } from './meme.service';
//import { CreateMemeDto } from './dto/create-meme.dto';
import { UpdateMemeDto } from './dto/update-meme.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('meme')
export class MemeController {
  //eslint-disable-next-line
  constructor(private readonly memeService: MemeService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @Body() createMemeDto: any,
    @Request() req: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /\/(jpg|jpeg|png)$/,
        })
        .build({
          exceptionFactory: (errors) =>
            new HttpException(errors, HttpStatus.BAD_REQUEST),
          fileIsRequired: false, // Esta línea hace que el archivo sea opcional
        }),
    )
    file?: Express.Multer.File,
  ) {
    //return this.memeService.create(createMemeDto);
    console.log('createMemeDto:', createMemeDto);
    console.log('file:', file);
    const { user } = req;
    createMemeDto.author = user.id;
    
    return this.memeService.create(createMemeDto, file);
  }

  @Get()
  findAll() {
    return this.memeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemeDto: UpdateMemeDto) {
    return this.memeService.update(+id, updateMemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memeService.remove(+id);
  }
}
