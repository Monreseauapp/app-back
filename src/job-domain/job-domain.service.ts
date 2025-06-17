import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class JobDomainService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createJobDomainDto: Prisma.JobDomainCreateInput) {
    return this.databaseService.jobDomain.create({
      data: createJobDomainDto,
    });
  }

  findAll() {
    return this.databaseService.jobDomain.findMany();
  }

  findOne(id: string) {
    return this.databaseService.jobDomain.findUnique({
      where: { id },
    });
  }

  update(id: string, updateJobDomainDto: Prisma.JobDomainUpdateInput) {
    return this.databaseService.jobDomain.update({
      where: { id },
      data: updateJobDomainDto,
    });
  }

  remove(id: string) {
    return this.databaseService.jobDomain.delete({
      where: { id },
    });
  }
}
