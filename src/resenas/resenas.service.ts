import { Injectable, Inject } from '@nestjs/common';
import { CreateResenaDto } from './dto/create-resena.dto';
import { UpdateResenaDto } from './dto/update-resena.dto';
import { IResenasService } from './resenas.interface';
import { Model } from 'mongoose';
import { Resena } from './entities/resena.entity';

@Injectable()
export class ResenasService implements IResenasService {
    constructor(
        @Inject('RESENA_MODEL')
        private resenaModel: Model<Resena>,
    ) {}

    async create(createResenaDto: CreateResenaDto): Promise<any> {
        const resena = new this.resenaModel(createResenaDto);
        const newResena=resena.save();
        if(newResena){
            return {message:'Reseña creada',success:true};
        }else{
            return {message:'Error al crear la reseña',success:false};
        }
        
    }

    async findAll(): Promise<Resena[]> {
        return this.resenaModel.find()
        .populate('idUsuario')
        .exec();
    }

    async findOne(id: string): Promise<Resena> {
        return this.resenaModel.findById(id).exec();
    }

    async update(id: string, updateResenaDto: UpdateResenaDto): Promise<Resena> {
        return this.resenaModel.findByIdAndUpdate(id, updateResenaDto, { new: true });
    }

    async remove(id: string): Promise<Resena> {
        return this.resenaModel.findByIdAndDelete(id);
    }

}
