import { Injectable, Logger } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { RecommandationService } from 'src/recommandation/recommandation.service'
import { UsersService } from 'src/users/users.service'

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

// Interface simplifiée
export interface RecommendationStatusEmailData {
  recommendationId: string
  status: string
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly recommandationService: RecommandationService,
    private readonly usersService: UsersService,
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
          expirationTime: '15',
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

  async sendRecommendationStatusEmail(
    data: RecommendationStatusEmailData,
  ): Promise<boolean> {
    try {
      const recommendation = await this.recommandationService.findRecoexpanded(data.recommendationId)

      if (!recommendation) {
        this.logger.warn(`Recommandation ${data.recommendationId} non trouvée`)
        return false
      }

      if (!recommendation.initiator || !recommendation.recipient || !recommendation.company) {
        this.logger.warn(`Recommandation ${data.recommendationId} n'a pas d'initiateur, destinataire ou entreprise`)
        return false
      }


      const recipients = [
        { 
          email: recommendation.initiator.email, 
          name: `${recommendation.initiator.firstName} ${recommendation.initiator.lastName}`, 
          role: 'initiator' 
        },
        { 
          email: recommendation.recipient.email, 
          name: `${recommendation.recipient.firstName} ${recommendation.recipient.lastName}`, 
          role: 'recipient' 
        },
        { 
          email: recommendation.company.email, 
          name: recommendation.company.name, 
          role: 'company' 
        }
      ]

      const emailPromises = recipients.map(async (recipient) => {
        return this.mailerService.sendMail({
          to: recipient.email,
          subject: `Mise à jour de recommandation - ${data.status}`,
          template: './recommendation-status',
          context: {
            Name: recipient.name,
            role: recipient.role,
            recommendationId: data.recommendationId,
            status: data.status,
            initiatorName: `${recommendation.initiator.firstName} ${recommendation.initiator.lastName}`,
            recipientName: recommendation.recipient
              ? `${recommendation.recipient.firstName} ${recommendation.recipient.lastName}`
              : '',
            companyName: recommendation.company?.name ?? '',
            year: new Date().getFullYear(),
          },
        })
      })

      await Promise.all(emailPromises)

      this.logger.log(`Emails de changement d'état envoyés pour la recommandation ${data.recommendationId}`)
      return true
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi des emails de changement d'état pour la recommandation ${data.recommendationId}:`,
        error,
      )
      return false
    }
  }
}
