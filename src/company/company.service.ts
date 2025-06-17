import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class CompanyService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createCompanyDto: Prisma.CompanyCreateInput) {
    return this.databaseService.company.create({
      data: createCompanyDto,
    });
  }

  findAll() {
    return this.databaseService.company.findMany();
  }

  findOne(id: string) {
    return this.databaseService.company.findUnique({
      where: { id },
    });
  }

  update(id: string, updateCompanyDto: Prisma.CompanyUpdateInput) {
    return this.databaseService.company.update({
        where: { id },
        data: updateCompanyDto,
      });
  }

  remove(id: string) {
    return this.databaseService.company.delete({
      where: { id },
    });
  }
}
