import { Module } from '@nestjs/common'
import { CompanyProjectService } from './company-project.service'
import { CompanyProjectController } from './company-project.controller'

@Module({
  controllers: [CompanyProjectController],
  providers: [CompanyProjectService],
})
export class CompanyProjectModule {}
