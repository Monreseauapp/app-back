import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { InvoiceService } from './invoice.service'
import { Prisma } from 'generated/prisma'

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() createInvoiceDto: Prisma.InvoiceCreateInput) {
    return this.invoiceService.create(createInvoiceDto)
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: Prisma.InvoiceUpdateInput,
  ) {
    return this.invoiceService.update(id, updateInvoiceDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id)
  }
}
