import { Module } from '@nestjs/common';
import { MemeService } from './meme.service';
import { MemeController } from './meme.controller';
import { DatabaseModule } from 'src/database/database.module';
//import { databaseProviders } from 'src/database/database.providers';
import { memesProviders } from './meme.providers';
import { AzureStorageService } from './azure.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MemeController],
  providers: [MemeService, ...memesProviders, AzureStorageService],
})
export class MemeModule {}
