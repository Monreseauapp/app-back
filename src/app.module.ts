import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { JobDomainModule } from './job-domain/job-domain.module';
import { CompanyModule } from './company/company.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { RecommandationsModule } from './recommandations/recommandations.module';
import { ModelModule } from './project/model/model.module';
import { RgpdModule } from './rgpd/rgpd.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { TransactionModule } from './transaction/transaction.module';
import { ReviewModule } from './review/review.module';
import { CompanyProjectModule } from './company-project/company-project.module';
import { ProjectModule } from './project/project.module';
import { ModelModule } from './project/model/model.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JobDomainModule,
    CompanyModule,
    SubscriptionModule,
    RecommandationsModule,
    ModelModule,
    ProjectModule,
    CompanyProjectModule,
    ReviewModule,
    TransactionModule,
    PaymentMethodModule,
    InvoiceModule,
    RgpdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
