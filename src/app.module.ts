import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { JobDomainModule } from './job-domain/job-domain.module'
import { CompanyModule } from './company/company.module'
import { SubscriptionModule } from './subscription/subscription.module'
import { ProjectModule } from './project/project.module'
import { CompanyProjectModule } from './company-project/company-project.module'
import { ReviewModule } from './review/review.module'
import { TransactionModule } from './transaction/transaction.module'
import { PaymentMethodModule } from './payment-method/payment-method.module'
import { InvoiceModule } from './invoice/invoice.module'
import { RgpdModule } from './rgpd/rgpd.module'
import { RecommandationModule } from './recommandation/recommandation.module'
import { UsersModule } from './users/users.module'
import { UploadModule } from './upload/upload.module'
import { AuthModule } from './auth/auth.module'
import { ApiKeyGuard } from './common/guards/api-key.guard'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    JobDomainModule,
    CompanyModule,
    SubscriptionModule,
    ProjectModule,
    CompanyProjectModule,
    ReviewModule,
    TransactionModule,
    PaymentMethodModule,
    InvoiceModule,
    RgpdModule,
    RecommandationModule,
    UsersModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
