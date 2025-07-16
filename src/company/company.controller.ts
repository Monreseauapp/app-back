import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CompanyService } from './company.service'
import { Prisma } from 'generated/prisma'
import { Public } from 'src/decorators/auth.decorator'

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Post()
  create(@Body() createCompanyDto: Prisma.CompanyCreateInput) {
    return this.companyService.create(createCompanyDto)
  }

  @Get()
  findAll() {
    return this.companyService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id)
  }

  @Get(':id/users')
  findAllUsers(@Param('id') id: string) {
    return this.companyService.findAllUsers(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: Prisma.CompanyUpdateInput,
  ) {
    return this.companyService.update(id, updateCompanyDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id)
  }
}
