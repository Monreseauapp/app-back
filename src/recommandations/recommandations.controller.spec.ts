import { Test, TestingModule } from '@nestjs/testing';
import { RecommandationsController } from './recommandations.controller';
import { RecommandationsService } from './recommandations.service';

describe('RecommandationsController', () => {
  let controller: RecommandationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommandationsController],
      providers: [RecommandationsService],
    }).compile();

    controller = module.get<RecommandationsController>(
      RecommandationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
