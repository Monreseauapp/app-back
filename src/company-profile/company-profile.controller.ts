import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CompanyProfileService } from './company-profile.service'
import { Prisma } from 'generated/prisma'

@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

  @Post()
  create(@Body() createCompanyProfileDto: Prisma.CompanyProfileCreateInput) {
    return this.companyProfileService.create(createCompanyProfileDto)
  }

  @Get()
  findAll() {
    return this.companyProfileService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyProfileService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyProfileDto: Prisma.CompanyProfileUpdateInput,
  ) {
    return this.companyProfileService.update(id, updateCompanyProfileDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyProfileService.remove(id)
  }
}
