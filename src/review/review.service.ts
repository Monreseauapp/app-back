import { Injectable } from '@nestjs/common'
import { Prisma } from 'generated/prisma'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class ReviewService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createReviewDto: Prisma.ReviewCreateInput) {
    return this.databaseService.review.create({
      data: createReviewDto,
    })
  }

  findAll() {
    return this.databaseService.review.findMany()
  }

  findOne(id: string) {
    return this.databaseService.review.findUnique({
      where: { id },
    })
  }

  findbyCompanyId(companyId: string) {
    return this.databaseService.review.findMany({
      where: { companyId },
    })
  }

  update(id: string, updateReviewDto: Prisma.ReviewUpdateInput) {
    return this.databaseService.review.update({
      where: { id },
      data: updateReviewDto,
    })
  }

  remove(id: string) {
    return this.databaseService.review.delete({
      where: { id },
    })
  }
}
