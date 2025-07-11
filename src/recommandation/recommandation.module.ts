import { Module } from '@nestjs/common'
import { RecommandationService } from './recommandation.service'
import { RecommandationController } from './recommandation.controller'

@Module({
  controllers: [RecommandationController],
  providers: [RecommandationService],
})
export class RecommandationModule {}
