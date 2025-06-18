import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RecommandationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createRecommandationDto: Prisma.RecommandationsCreateInput) {
    return this.databaseService.recommandations.create({
      data: createRecommandationDto,
    });
  }

  findAll() {
    return this.databaseService.recommandations.findMany();
  }

  findOne(id: string) {
    return this.databaseService.recommandations.findUnique({
      where: { id },
    });
  }

  update(
    id: string,
    updateRecommandationDto: Prisma.RecommandationsUpdateInput,
  ) {
    return this.databaseService.recommandations.update({
      where: { id },
      data: updateRecommandationDto,
    });
  }

  remove(id: string) {
    return this.databaseService.recommandations.delete({
      where: { id },
    });
  }
}
