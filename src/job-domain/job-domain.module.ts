import { Module } from '@nestjs/common'
import { JobDomainService } from './job-domain.service'
import { JobDomainController } from './job-domain.controller'

@Module({
  controllers: [JobDomainController],
  providers: [JobDomainService],
})
export class JobDomainModule {}
