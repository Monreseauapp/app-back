import { Test, TestingModule } from '@nestjs/testing'
import { JobDomainController } from './job-domain.controller'
import { JobDomainService } from './job-domain.service'

describe('JobDomainController', () => {
  let controller: JobDomainController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobDomainController],
      providers: [JobDomainService],
    }).compile()

    controller = module.get<JobDomainController>(JobDomainController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
