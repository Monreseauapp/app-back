import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RecommandationService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createRecommandationDto: Prisma.RecommandationCreateInput) {
    return this.databaseService.recommandation.create({
      data: createRecommandationDto,
    });
  }

  findAll() {
    return this.databaseService.recommandation.findMany();
  }

  findOne(id: string) {
    return this.databaseService.recommandation.findUnique({
      where: { id },
    });
  }

  update(id: string, updateRecommandationDto: Prisma.RecommandationUpdateInput) {
    return this.databaseService.recommandation.update({
      where: { id },
      data: updateRecommandationDto,
    });
  }

  remove(id: string) {
    return this.databaseService.recommandation.delete({
      where: { id },
    });
  }
}
