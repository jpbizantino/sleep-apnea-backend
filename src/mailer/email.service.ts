import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendEmail(
    emailRecipients: string[] = [],
    htmBody: string = '<b>welcome</b>',
  ) {
    this.mailerService
      .sendMail({
        bcc: this.configService.get('EMAIL_BCC'),
        to: emailRecipients, // list of receivers
        //from: 'sistemas@totalsleep.com.ar', // sender address
        subject: 'Resultado de encuesta', // Subject line
        // text: 'welcome', // plaintext body
        html: htmBody, // HTML body content
      })
      .then(() => {
        console.log('Email Sent OK');
      })
      .catch(() => {
        console.log('Email Failed !!!');
      });
  }
}
