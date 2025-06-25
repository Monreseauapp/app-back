import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RgpdService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createRgpdDto: Prisma.RGPDCreateInput) {
    return this.databaseService.rGPD.create({
      data: createRgpdDto,
    });
  }

  findAll() {
    return this.databaseService.rGPD.findMany();
  }

  findOne(id: string) {
    return this.databaseService.rGPD.findUnique({
      where: { id },
    });
  }

  update(id: string, updateRgpdDto: Prisma.RGPDUpdateInput) {
    return this.databaseService.rGPD.update({
      where: { id },
      data: updateRgpdDto,
    });
  }

  remove(id: string) {
    return this.databaseService.rGPD.delete({
      where: { id },
    });
  }
}
