import { Module } from '@nestjs/common';
import { RgpdService } from './rgpd.service';
import { RgpdController } from './rgpd.controller';

@Module({
  controllers: [RgpdController],
  providers: [RgpdService],
})
export class RgpdModule {}
