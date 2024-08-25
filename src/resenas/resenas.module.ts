import { Module } from '@nestjs/common';
import { ResenasService } from './resenas.service';
import { ResenasController } from './resenas.controller';
import { resenasProviders } from './resenas.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ResenasController],
  providers: [ResenasService, ...resenasProviders],
})
export class ResenasModule {}
