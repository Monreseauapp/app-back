import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createPaymentMethodDto: Prisma.PaymentMethodCreateInput) {
    return this.databaseService.paymentMethod.create({
      data: createPaymentMethodDto,
    });
  }

  findAll() {
    return this.databaseService.paymentMethod.findMany();
  }

  findOne(id: string) {
    return this.databaseService.paymentMethod.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePaymentMethodDto: Prisma.PaymentMethodUpdateInput) {
    return this.databaseService.paymentMethod.update({
      where: { id },
      data: updatePaymentMethodDto,
    });
  }

  remove(id: string) {
    return this.databaseService.paymentMethod.delete({
      where: { id },
    });
  }
}
