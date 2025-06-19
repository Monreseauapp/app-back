import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TransactionService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTransactionDto: Prisma.TransactionCreateInput) {
    return this.databaseService.transaction.create({
      data: createTransactionDto,
    });
  }

  findAll() {
    return this.databaseService.transaction.findMany();
  }

  findOne(id: string) {
    return this.databaseService.transaction.findUnique({
      where: { id },
    });
  }

  update(id: string, updateTransactionDto: Prisma.TransactionUpdateInput) {
    return this.databaseService.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  remove(id: string) {
    return this.databaseService.transaction.delete({
      where: { id },
    });
  }
}
