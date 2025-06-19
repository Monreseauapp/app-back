import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecommandationService } from './recommandation.service';
import { Prisma } from 'generated/prisma';

@Controller('recommandation')
export class RecommandationController {
  constructor(private readonly recommandationService: RecommandationService) {}

  @Post()
  create(@Body() createRecommandationDto: Prisma.RecommandationCreateInput) {
    return this.recommandationService.create(createRecommandationDto);
  }

  @Get()
  findAll() {
    return this.recommandationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommandationService.findOne(id);
  }
  
  @Get('recipient/:recipientId')
  findByRecipientId(@Param('recipientId') recipientId: string) {
    return this.recommandationService.findByRecipientId(recipientId);
  }

  @Get('initiator/:initiatorId')
  findByInitiatorId(@Param('initiatorId') initiatorId: string) {
    return this.recommandationService.findByInitiatorId(initiatorId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecommandationDto: Prisma.RecommandationUpdateInput,
  ) {
    return this.recommandationService.update(id, updateRecommandationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommandationService.remove(id);
  }
}
