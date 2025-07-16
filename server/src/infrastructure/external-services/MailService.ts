import path from 'node:path';

import nodemailer, { Transporter } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

import logger from '../logger/winstonLogger.js';
import {
  MAIL_FROM,
  MAIL_HOST,
  MAIL_PASS,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_USER,
} from '../config/config.js';

interface MailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

class MailerService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: MAIL_SECURE === 'true',
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.hbs',
          partialsDir: path.resolve('./templates/emails/'),
          layoutsDir: path.resolve('./templates/emails/'),
          defaultLayout: '',
        },
        viewPath: path.resolve('./templates/emails/'),
        extName: '.hbs',
      }),
    );
  }

  public sendMail(options: MailOptions): void {
    try {
      this.transporter.sendMail({
        from: MAIL_FROM,
        to: options.to,
        subject: options.subject,
        template: options.template,
        context: options.context,
      });
      logger.info(`Email sent to ${options.to}`);
    } catch (error) {
      logger.error('Failed to send email', error);
      throw error;
    }
  }
}

export default MailerService;
