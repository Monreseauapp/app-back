import { Test, TestingModule } from '@nestjs/testing'
import { RgpdService } from './rgpd.service'

describe('RgpdService', () => {
  let service: RgpdService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RgpdService],
    }).compile()

    service = module.get<RgpdService>(RgpdService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
