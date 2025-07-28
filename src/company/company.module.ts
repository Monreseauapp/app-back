import { Module } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CompanyController } from './company.controller'
import { StripeService } from 'src/stripe/stripe.service'

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, StripeService],
})
export class CompanyModule {}
