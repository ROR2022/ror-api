import { Injectable, Inject } from '@nestjs/common';
//import { CreateMemeDto } from './dto/create-meme.dto';
import { UpdateMemeDto } from './dto/update-meme.dto';
import { Model } from 'mongoose';
//import { InjectModel } from '@nestjs/mongoose';
import { Meme } from './entities/meme.entity';
import { AzureStorageService } from './azure.service';
//import * as potrace from 'potrace';

@Injectable()
export class MemeService {

  constructor(
    @Inject('MEME_MODEL') 
    private memeModel: Model<Meme>,
    private azureStorageService: AzureStorageService
  ) {}

  async create(createMemeDto: any, file?: Express.Multer.File) {
    //const newMeme = new this.memeModel(createMemeDto);
    //primero se convierte la imagen a svg
    try {
    
      const url = await this.azureStorageService.uploadImage(file);
    
        const dataMeme= {
          topText: createMemeDto.topText,
          bottomText: createMemeDto.bottomText,
          author: createMemeDto.author,
          memeSVG: '',
          memeURL: url
        }
        const newMeme = new this.memeModel(dataMeme);
        const resultCreateMeme= await newMeme.save()
        return resultCreateMeme;   
      
    } catch (error) {
      console.log('Error en el servicio', error);
      return error;   
    }

  }

  findAll() {
    return this.memeModel.find();
    //return `This action returns all meme`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meme`;
  }

  update(id: number, updateMemeDto: UpdateMemeDto) {
    return `This action updates a #${id} meme`;
  }

  remove(id: number) {
    return `This action removes a #${id} meme`;
  }
}
