import { Test, TestingModule } from '@nestjs/testing'
import { EmailService } from './email.service'

describe('EmailService', () => {
  let service: EmailService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: 'MailerService',
          useValue: {},
        },
        {
          provide: 'ConfigService',
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<EmailService>(EmailService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
