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
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
      select: {
        companyId: true,
      },
    })
    if (user?.companyId) {
      const companyUsers = await this.databaseService.user.findMany({
        where: { companyId: user.companyId },
        select: { id: true },
      })
      const companyUserIds = companyUsers.map((u) => u.id)

      const sent = await this.databaseService.recommandation.findMany({
        where: { initiatorId: { in: companyUserIds } },
      })

      const receivedByCompany =
        await this.databaseService.recommandation.findMany({
          where: {
            recipient: {
              companyId: user.companyId,
            },
            recipientId: { notIn: companyUserIds },
          },
        })

      const receivedByUsers =
        await this.databaseService.recommandation.findMany({
          where: {
            recipientId: { in: companyUserIds },
          },
        })

      return {
        sent,
        receivedByCompany,
        receivedByUsers,
      }
    }
    if (!user?.companyId) {
      const sent = await this.databaseService.recommandation.findMany({
        where: { initiatorId: userId },
      })
      const received = await this.databaseService.recommandation.findMany({
        where: { recipientId: userId },
      })
      return { sent, received }
    }
    if (!user) {
      throw new Error('User not found')
    }
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
