import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { RecommandationModule } from 'src/recommandation/recommandation.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule,
    RecommandationModule, // Importer le module qui contient RecommandationService
    UsersModule,          // Importer le module qui contient UsersService
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASS'),
          },
        },
        defaults: {
          from:
            configService.get<string>('SMTP_FROM') ||
            configService.get<string>('SMTP_USER'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService], // ✅ Seulement EmailService, pas les autres services
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}