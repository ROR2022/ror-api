import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { verificationProviders } from './verification.providers';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';
import { databaseProviders } from 'src/database/database.providers';
//import { UsersModule } from 'src/users/users.module';
//import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VerificationController],
  providers: [
    VerificationService,
    ...verificationProviders,
    ...usersProviders,
    UsersService,
    ...databaseProviders,
  ],
  exports: [VerificationService],
})
export class VerificationModule {}
