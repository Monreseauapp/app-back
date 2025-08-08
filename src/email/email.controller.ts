import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  EmailService,
  WelcomeEmailData,
  PasswordResetEmailData,
  ContactEmailData,
} from './email.service'
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class SendWelcomeEmailDto implements WelcomeEmailData {
  @IsEmail({}, { message: 'Email invalide' })
  email: string

  @IsNotEmpty({ message: 'Le nom est requis' })
  @IsString()
  @MaxLength(100)
  name: string
}

export class SendPasswordResetEmailDto implements PasswordResetEmailData {
  @IsEmail({}, { message: 'Email invalide' })
  email: string

  @IsNotEmpty({ message: 'Le nom est requis' })
  @IsString()
  @MaxLength(100)
  name: string

  @IsNotEmpty({ message: 'Le token est requis' })
  @IsString()
  token: string
}

export class SendContactEmailDto implements ContactEmailData {
  @IsEmail({}, { message: 'Email invalide' })
  from: string

  @IsNotEmpty({ message: 'Le nom est requis' })
  @IsString()
  @MaxLength(100)
  name: string

  @IsNotEmpty({ message: 'Le sujet est requis' })
  @IsString()
  @MaxLength(200)
  subject: string

  @IsNotEmpty({ message: 'Le message est requis' })
  @IsString()
  @MaxLength(2000)
  message: string
}

export class SendCustomEmailDto {
  @IsEmail({}, { message: 'Email invalide' })
  to: string

  @IsNotEmpty({ message: 'Le sujet est requis' })
  @IsString()
  @MaxLength(200)
  subject: string

  @IsNotEmpty({ message: 'Le template est requis' })
  @IsString()
  template: string

  context?: Record<string, unknown>
}

export class SendPlainTextEmailDto {
  @IsEmail({}, { message: 'Email invalide' })
  to: string

  @IsNotEmpty({ message: 'Le sujet est requis' })
  @IsString()
  @MaxLength(200)
  subject: string

  @IsNotEmpty({ message: 'Le texte est requis' })
  @IsString()
  @MaxLength(5000)
  text: string
}

export class SendRecommendationStatusEmailDto {
  @IsNotEmpty({ message: "L'identifiant de recommandation est requis" })
  @IsString()
  recommendationId: string

  @IsEmail({}, { message: 'Email invalide' })
  to: string

  @IsNotEmpty({ message: 'Le statut est requis' })
  @IsString()
  status: string

  @IsNotEmpty({ message: 'Le nom est requis' })
  @IsString()
  @MaxLength(100)
  name: string
}


@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('welcome')
  @HttpCode(HttpStatus.OK)
  async sendWelcomeEmail(@Body() sendWelcomeEmailDto: SendWelcomeEmailDto) {
    try {
      const success =
        await this.emailService.sendWelcomeEmail(sendWelcomeEmailDto)

      if (!success) {
        throw new InternalServerErrorException(
          "Impossible d'envoyer l'email de bienvenue",
        )
      }

      return {
        message: 'Email de bienvenue envoyé avec succès',
        success: true,
      }
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error
      }
      throw new BadRequestException("Données invalides pour l'envoi d'email")
    }
  }

  @Post('password-reset')
  @HttpCode(HttpStatus.OK)
  async sendPasswordResetEmail(
    @Body() sendPasswordResetEmailDto: SendPasswordResetEmailDto,
  ) {
    try {
      const success = await this.emailService.sendPasswordResetEmail(
        sendPasswordResetEmailDto,
      )

      if (!success) {
        throw new InternalServerErrorException(
          "Impossible d'envoyer l'email de réinitialisation",
        )
      }

      return {
        message: 'Email de réinitialisation envoyé avec succès',
        success: true,
      }
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error
      }
      throw new BadRequestException("Données invalides pour l'envoi d'email")
    }
  }

  @Post('contact')
  @HttpCode(HttpStatus.OK)
  async sendContactEmail(@Body() sendContactEmailDto: SendContactEmailDto) {
    try {
      const success =
        await this.emailService.sendContactEmail(sendContactEmailDto)

      if (!success) {
        throw new InternalServerErrorException(
          "Impossible d'envoyer l'email de contact",
        )
      }

      return {
        message: 'Email de contact envoyé avec succès',
        success: true,
      }
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error
      }
      throw new BadRequestException("Données invalides pour l'envoi d'email")
    }
  }

  @Post('custom')
  @HttpCode(HttpStatus.OK)
  async sendCustomEmail(@Body() sendCustomEmailDto: SendCustomEmailDto) {
    try {
      const { to, subject, template, context } = sendCustomEmailDto
      const success = await this.emailService.sendCustomEmail(
        to,
        subject,
        template,
        context as Record<string, unknown>,
      )

      if (!success) {
        throw new InternalServerErrorException(
          "Impossible d'envoyer l'email personnalisé",
        )
      }

      return {
        message: 'Email personnalisé envoyé avec succès',
        success: true,
      }
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error
      }
      throw new BadRequestException("Données invalides pour l'envoi d'email")
    }
  }

  @Post('plain-text')
  @HttpCode(HttpStatus.OK)
  async sendPlainTextEmail(
    @Body() sendPlainTextEmailDto: SendPlainTextEmailDto,
  ) {
    try {
      const { to, subject, text } = sendPlainTextEmailDto
      const success = await this.emailService.sendPlainTextEmail(
        to,
        subject,
        text,
      )

      if (!success) {
        throw new InternalServerErrorException(
          "Impossible d'envoyer l'email texte",
        )
      }

      return {
        message: 'Email texte envoyé avec succès',
        success: true,
      }
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error
      }
      throw new BadRequestException("Données invalides pour l'envoi d'email")
    }
  }


  @Post('recommendation-status')
  @HttpCode(HttpStatus.OK)
  async sendRecommendationStatusEmail(
    @Body() sendRecommendationStatusEmailDto: SendRecommendationStatusEmailDto,
  ) {
    try {
      const success = await this.emailService.sendRecommendationStatusEmail(
        sendRecommendationStatusEmailDto,
      )

      if (!success) {
        throw new InternalServerErrorException(
          "Impossible d'envoyer l'email de statut de recommandation",
        )
      }

      return {
        message: 'Email de statut de recommandation envoyé avec succès',
        success: true,
      }
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error
      }
      throw new BadRequestException("Données invalides pour l'envoi d'email")
    }
  }
}
