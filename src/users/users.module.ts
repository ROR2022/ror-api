import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './users.providers';
//import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { VerificationService } from 'src/verification/verification.service';
import { verificationProviders } from 'src/verification/verification.providers';
import { databaseProviders } from 'src/database/database.providers';
//import { VerificationModule } from 'src/verification/verification.module';
//import { MailerModule } from 'src/mailer/mailer.module';
//import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    AuthService,
    JwtService,
    MailerService,
    VerificationService,
    ...verificationProviders,
    ...databaseProviders,
  ],
})
export class UsersModule {}
