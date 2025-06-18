import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RgpdService } from './rgpd.service';
import { CreateRgpdDto } from './dto/create-rgpd.dto';
import { UpdateRgpdDto } from './dto/update-rgpd.dto';

@Controller('rgpd')
export class RgpdController {
  constructor(private readonly rgpdService: RgpdService) {}

  @Post()
  create(@Body() createRgpdDto: CreateRgpdDto) {
    return this.rgpdService.create(createRgpdDto);
  }

  @Get()
  findAll() {
    return this.rgpdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rgpdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRgpdDto: UpdateRgpdDto) {
    return this.rgpdService.update(+id, updateRgpdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rgpdService.remove(+id);
  }
}
