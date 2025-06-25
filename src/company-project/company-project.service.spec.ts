import { Test, TestingModule } from '@nestjs/testing';
import { CompanyProjectService } from './company-project.service';

describe('CompanyProjectService', () => {
  let service: CompanyProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyProjectService],
    }).compile();

    service = module.get<CompanyProjectService>(CompanyProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
