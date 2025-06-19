import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RgpdService } from './rgpd.service';
import { Prisma } from 'generated/prisma';

@Controller('rgpd')
export class RgpdController {
  constructor(private readonly rgpdService: RgpdService) {}

  @Post()
  create(@Body() createRgpdDto: Prisma.RGPDCreateInput) {
    return this.rgpdService.create(createRgpdDto);
  }

  @Get()
  findAll() {
    return this.rgpdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rgpdService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRgpdDto: Prisma.RGPDUpdateInput,
  ) {
    return this.rgpdService.update(id, updateRgpdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rgpdService.remove(id);
  }
}
