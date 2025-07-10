import { Test, TestingModule } from '@nestjs/testing'
import { CompanyProjectController } from './company-project.controller'
import { CompanyProjectService } from './company-project.service'

describe('CompanyProjectController', () => {
  let controller: CompanyProjectController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyProjectController],
      providers: [CompanyProjectService],
    }).compile()

    controller = module.get<CompanyProjectController>(CompanyProjectController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
