import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
//import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { databaseProviders } from 'src/database/database.providers';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from 'src/users/users.providers';
import { AuthController } from './auth.controller';
//import { ConfigModule } from '@nestjs/config';
//import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';
import { MailerService } from 'src/mailer/mailer.service';
import { VerificationService } from 'src/verification/verification.service';
import { verificationProviders } from 'src/verification/verification.providers';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'mySecret2024',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtModule,
    JwtService,
    JwtAuthGuard,
    UsersService,
    ...databaseProviders,
    ...usersProviders,
    ...verificationProviders,
    MailerService,
    VerificationService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
