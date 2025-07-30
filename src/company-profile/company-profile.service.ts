import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { Prisma } from 'generated/prisma'

@Injectable()
export class CompanyProfileService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createCompanyProfileDto: Prisma.CompanyProfileCreateInput) {
    return this.databaseService.companyProfile.create({
      data: createCompanyProfileDto,
    })
  }

  findAll() {
    return this.databaseService.companyProfile.findMany()
  }

  findOne(id: string) {
    return this.databaseService.companyProfile.findUnique({
      where: { id },
    })
  }

  update(
    id: string,
    updateCompanyProfileDto: Prisma.CompanyProfileUpdateInput,
  ) {
    return this.databaseService.companyProfile.update({
      where: { id },
      data: updateCompanyProfileDto,
    })
  }

  remove(id: string) {
    return this.databaseService.companyProfile.delete({
      where: { id },
    })
  }
}
