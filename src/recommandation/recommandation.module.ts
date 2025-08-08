import { Module, forwardRef } from '@nestjs/common';
import { RecommandationService } from './recommandation.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule],
  providers: [RecommandationService],
  exports: [RecommandationService],
})
export class RecommandationModule {}
