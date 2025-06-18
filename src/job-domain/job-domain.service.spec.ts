import { Test, TestingModule } from '@nestjs/testing';
import { JobDomainService } from './job-domain.service';

describe('JobDomainService', () => {
  let service: JobDomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobDomainService],
    }).compile();

    service = module.get<JobDomainService>(JobDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
