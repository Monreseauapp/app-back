import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { JobDomainModule } from './job-domain/job-domain.module';
import { CompanyModule } from './company/company.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ProjectModule } from './project/project.module';
import { CompanyProjectModule } from './company-project/company-project.module';
import { ReviewModule } from './review/review.module';
import { TransactionModule } from './transaction/transaction.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { InvoiceModule } from './invoice/invoice.module';
import { RgpdModule } from './rgpd/rgpd.module';
import { UserModule } from './user/user.module';
import { RecommandationModule } from './recommandation/recommandation.module';

@Module({
  imports: [
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
    UserModule,
    RecommandationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
