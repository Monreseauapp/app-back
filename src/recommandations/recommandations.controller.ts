import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecommandationsService } from './recommandations.service';
import { Prisma } from 'generated/prisma';

@Controller('recommandations')
export class RecommandationsController {
  constructor(
    private readonly recommandationsService: RecommandationsService,
  ) {}

  @Post()
  create(@Body() createRecommandationDto: Prisma.RecommandationsCreateInput) {
    return this.recommandationsService.create(createRecommandationDto);
  }

  @Get()
  findAll() {
    return this.recommandationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommandationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecommandationDto: Prisma.RecommandationsUpdateInput,
  ) {
    return this.recommandationsService.update(id, updateRecommandationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommandationsService.remove(id);
  }
}
