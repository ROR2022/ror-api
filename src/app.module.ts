import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { VerificationModule } from './verification/verification.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { databaseProviders } from './database/database.providers';
import { usersProviders } from './users/users.providers';
import { verificationProviders } from './verification/verification.providers';
import { ResenasModule } from './resenas/resenas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en toda la aplicación
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'homepage/mypage'),
      exclude: ['/api/(.*)'],
    }),
    UsersModule,
    CommentsModule,
    VerificationModule,
    DatabaseModule,
    AuthModule,
    MailerModule,
    ResenasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...databaseProviders,
    ...usersProviders,
    ...verificationProviders,
  ],
})
export class AppModule {}
