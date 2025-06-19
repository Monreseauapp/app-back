import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { JobDomainModule } from './job-domain/job-domain.module';
import { CompanyModule } from './company/company.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { RecommandationsModule } from './recommandations/recommandations.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JobDomainModule,
    CompanyModule,
    SubscriptionModule,
    RecommandationsModule,
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
