import { Injectable, Logger } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

export interface WelcomeEmailData {
  email: string
  name: string
}

export interface PasswordResetEmailData {
  email: string
  name: string
  token: string
}

export interface ContactEmailData {
  from: string
  name: string
  subject: string
  message: string
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
    try {
      const appLink =
        this.configService.get<string>('FRONTEND_URL') ||
        'https://localhost:3000'

      await this.mailerService.sendMail({
        to: data.email,
        subject: 'Bienvenue dans notre application !',
        template: './welcome',
        context: {
          name: data.name,
          appName: 'Votre Application',
          appLink: appLink,
          year: new Date().getFullYear(),
        },
      })

      this.logger.log(`Email de bienvenue envoyé à ${data.email}`)
      return true
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi de l'email de bienvenue à ${data.email}:`,
        error,
      )
      return false
    }
  }
  async sendPasswordResetEmail(data: PasswordResetEmailData): Promise<boolean> {
    try {
      const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${data.token}`

      await this.mailerService.sendMail({
        to: data.email,
        subject: 'Réinitialisation de votre mot de passe',
        template: './password-reset',
        context: {
          name: data.name,
          resetUrl: resetUrl,
          expirationTime: '1 heure',
        },
      })

      this.logger.log(`Email de réinitialisation envoyé à ${data.email}`)
      return true
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi de l'email de réinitialisation à ${data.email}:`,
        error,
      )
      return false
    }
  }

  async sendContactEmail(data: ContactEmailData): Promise<boolean> {
    try {
      const adminEmail = this.configService.get<string>('ADMIN_EMAIL')

      await this.mailerService.sendMail({
        to: adminEmail,
        subject: `Nouveau message de contact: ${data.subject}`,
        template: './contact',
        context: {
          fromEmail: data.from,
          fromName: data.name,
          subject: data.subject,
          message: data.message,
          receivedAt: new Date().toLocaleString('fr-FR'),
        },
      })

      // Email de confirmation à l'expéditeur
      await this.mailerService.sendMail({
        to: data.from,
        subject: 'Confirmation de réception de votre message',
        template: './contact-confirmation',
        context: {
          name: data.name,
          originalSubject: data.subject,
        },
      })

      this.logger.log(`Email de contact reçu de ${data.from}`)
      return true
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi de l'email de contact de ${data.from}:`,
        error,
      )
      return false
    }
  }

  async sendCustomEmail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, unknown>,
  ): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: to,
        subject: subject,
        template: template,
        context: context,
      })

      this.logger.log(`Email personnalisé envoyé à ${to}`)
      return true
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi de l'email personnalisé à ${to}:`,
        error,
      )
      return false
    }
  }

  async sendPlainTextEmail(
    to: string,
    subject: string,
    text: string,
  ): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: to,
        subject: subject,
        text: text,
      })

      this.logger.log(`Email texte envoyé à ${to}`)
      return true
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi de l'email texte à ${to}:`,
        error,
      )
      return false
    }
  }
}
