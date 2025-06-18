import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InvoiceService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createInvoiceDto: Prisma.InvoiceCreateInput) {
    return this.databaseService.invoice.create({
      data: createInvoiceDto,
    });
  }

  findAll() {
    return this.databaseService.invoice.findMany();
  }

  findOne(id: string) {
    return this.databaseService.invoice.findUnique({
      where: { id },
    });
  }

  update(id: string, updateInvoiceDto: Prisma.InvoiceUpdateInput) {
    return this.databaseService.invoice.update({
      where: { id },
      data: updateInvoiceDto,
    });
  }

  remove(id: string) {
    return this.databaseService.invoice.delete({
      where: { id },
    });
  }
}
