import { Test, TestingModule } from '@nestjs/testing';
import { RecommandationsService } from './recommandations.service';

describe('RecommandationsService', () => {
  let service: RecommandationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommandationsService],
    }).compile();

    service = module.get<RecommandationsService>(RecommandationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
