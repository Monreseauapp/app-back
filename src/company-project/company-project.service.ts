import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CompanyProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createCompanyProjectDto: Prisma.CompanyProjectCreateInput) {
    return this.databaseService.companyProject.create({
      data: createCompanyProjectDto,
    });
  }

  findAll() {
    return this.databaseService.companyProject.findMany();
  }

  findOne(projectId: string, companyId: string) {
    return this.databaseService.companyProject.findUnique({
      where: {
        projectId_companyId: {
          projectId,
          companyId,
        },
      },
    });
  }

  update(
    projectId: string,
    companyId: string,
    updateCompanyProjectDto: Prisma.CompanyProjectUpdateInput,
  ) {
    return this.databaseService.companyProject.update({
      where: {
        projectId_companyId: {
          projectId,
          companyId,
        },
      },
      data: updateCompanyProjectDto,
    });
  }

  remove(projectId: string, companyId: string) {
    return this.databaseService.companyProject.delete({
      where: {
        projectId_companyId: {
          projectId,
          companyId,
        },
      },
    });
  }
}
