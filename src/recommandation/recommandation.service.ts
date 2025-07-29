import { Injectable } from '@nestjs/common'
import { Prisma } from 'generated/prisma'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class RecommandationService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createRecommandationDto: Prisma.RecommandationCreateInput) {
    return this.databaseService.recommandation.create({
      data: createRecommandationDto,
    })
  }

  findAll() {
    return this.databaseService.recommandation.findMany()
  }

  findOne(id: string) {
    return this.databaseService.recommandation.findUnique({
      where: { id },
    })
  }

  findByRecipientId(recipientId: string) {
    return this.databaseService.recommandation.findMany({
      where: { recipientId },
    })
  }

  findByInitiatorId(initiatorId: string) {
    return this.databaseService.recommandation.findMany({
      where: { initiatorId },
    })
  }

  findByCompanyId(companyId: string) {
    return this.databaseService.recommandation.findMany({
      where: { companyId },
    })
  }

  findAllByCompanyInitiators(companyId: string) {
    return this.databaseService.recommandation.findMany({
      where: {
        initiator: {
          companyId: companyId,
        },
      },
    })
  }

  findAllByCompanyRecipients(companyId: string) {
    return this.databaseService.recommandation.findMany({
      where: {
        recipient: {
          companyId: companyId,
        },
      },
    })
  }

  async findAllRecommandationsByUserId(userId: string) {
    return this.databaseService.recommandation.findMany({
      where: {
        OR: [{ initiatorId: userId }, { recipientId: userId }],
      },
    })
  }

  update(
    id: string,
    updateRecommandationDto: Prisma.RecommandationUpdateInput,
  ) {
    return this.databaseService.recommandation.update({
      where: { id },
      data: updateRecommandationDto,
    })
  }

  remove(id: string) {
    return this.databaseService.recommandation.delete({
      where: { id },
    })
  }
}
