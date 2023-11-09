import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    emailRecipients: string[] = [],
    htmBody: string = '<b>welcome</b>',
  ) {
    this.mailerService
      .sendMail({
        to: emailRecipients, // list of receivers
        //from: 'sistemas@totalsleep.com.ar', // sender address
        subject: 'Resultado de encuesta', // Subject line
        // text: 'welcome', // plaintext body
        html: htmBody, // HTML body content
      })
      .then(() => {
        console.log('ok');
      })
      .catch(() => {
        console.log('error');
      });
  }
}
