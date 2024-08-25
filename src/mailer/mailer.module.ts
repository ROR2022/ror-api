import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { VerificationService } from 'src/verification/verification.service';
import { VerificationModule } from 'src/verification/verification.module';
import { verificationProviders } from 'src/verification/verification.providers';
import { databaseProviders } from 'src/database/database.providers';
import { usersProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [VerificationModule],
  providers: [
    MailerService,
    VerificationService,
    ...verificationProviders,
    ...databaseProviders,
    ...usersProviders,
    UsersService,
  ],
  exports: [MailerService],
})
export class MailerModule {}
