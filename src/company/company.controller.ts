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
import { AuthPublic } from 'src/common/decorators/auth.decorator'

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @AuthPublic()
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

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.companyService.findByEmail(email)
  }

  @Get(':id/payment-methods')
  findCompanyPaymentMethods(@Param('id') id: string) {
    return this.companyService.findCompanyPaymentMethods(id)
  }

  @Get(':id/customer-id')
  findCustomerId(@Param('id') id: string) {
    return this.companyService.findCustomerId(id)
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
