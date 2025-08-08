import { Injectable } from '@nestjs/common'
import { Prisma, RecoState } from 'generated/prisma'
import { DatabaseService } from 'src/database/database.service'
import { EmailService } from 'src/email/email.service'

@Injectable()
export class RecommandationService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly emailService: EmailService,
  ) {}

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

  findRecoexpanded(id: string) {
    return this.databaseService.recommandation.findUnique({
      where: { id },
      include: {
        initiator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        recipient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
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
        where: {
          OR: [
            { initiatorId: { in: companyUserIds } },
            {
              companyId: { equals: user.companyId },
              recipientId: { notIn: companyUserIds },
            },
          ],
        },
        include: {
          initiator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          recipient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          company: { select: { id: true, name: true, email: true } },
        },
      })

      const received = await this.databaseService.recommandation.findMany({
        where: {
          recipientId: { in: companyUserIds },
        },
        include: {
          initiator: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          recipient: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          company: { select: { id: true, name: true, email: true } },
        },
      })

      return {
        sent,
        received,
      }
    }
    if (!user?.companyId) {
      const sent = await this.databaseService.recommandation.findMany({
        where: { initiatorId: userId },
        include: {
          initiator: true,
          recipient: true,
          company: true,
        },
      })
      const received = await this.databaseService.recommandation.findMany({
        where: { recipientId: userId },
        include: {
          initiator: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          recipient: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          company: { select: { id: true, name: true, email: true } },
        },
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

  async updateStatus(id: string, newStatus: RecoState, updaterRole: 'initiator' | 'recipient') {

    let updatedRecommandation;
    
    if (updaterRole === 'initiator') {
      updatedRecommandation = await this.databaseService.recommandation.update({
        where: { id },
        data: { RecoStateCompany: newStatus },
      });
    } else if (updaterRole === 'recipient') {
      updatedRecommandation = await this.databaseService.recommandation.update({
        where: { id },
        data: { RecoStateRecipient: newStatus },
      });
    } else {
      throw new Error('Invalid updater role');
    }

    await this.emailService.sendRecommendationStatusEmail({
      recommendationId: id,
      status: newStatus
    });

    return updatedRecommandation;
  }
}
