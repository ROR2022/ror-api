import { Injectable } from '@nestjs/common';
import { sendConfimCodeMailer } from './lib/libMailer';
//import { VerificationService } from 'src/verification/verification.service';
//private readonly verificationService: VerificationService
@Injectable()
export class MailerService {
  constructor() {}

  sendMail(email: string, userId: string): any {
    const code = this.generateRandomCode();
    sendConfimCodeMailer(email, +code);
    //this.verificationService.create({ email, code, userId });
    return { email, code, userId };
    //console.log('Sending mail...');
  }
  generateRandomCode() {
    // Generate random code between 1000 and 9999
    return String(Math.floor(1000 + Math.random() * 9000));
  }
}
