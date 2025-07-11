import { Injectable } from '@nestjs/common'
import { Prisma } from 'generated/prisma'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class SubscriptionService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createSubscriptionDto: Prisma.SubscriptionCreateInput) {
    return this.databaseService.subscription.create({
      data: createSubscriptionDto,
    })
  }

  findAll() {
    return this.databaseService.subscription.findMany()
  }

  findOne(id: string) {
    return this.databaseService.subscription.findUnique({
      where: { id },
    })
  }

  update(id: string, updateSubscriptionDto: Prisma.SubscriptionUpdateInput) {
    return this.databaseService.subscription.update({
      where: { id },
      data: updateSubscriptionDto,
    })
  }

  remove(id: string) {
    return this.databaseService.subscription.delete({
      where: { id },
    })
  }
}
