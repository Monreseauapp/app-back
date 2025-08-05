import { Injectable } from '@nestjs/common'
import { Prisma } from 'generated/prisma'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const existingUser = await this.databaseService.user.findUnique({
      where: { email: createUserDto.email as string },
    })
    if (existingUser) {
      return { error: 'Adresse email déjà utilisée' }
    }
    return this.databaseService.user.create({
      data: createUserDto,
    })
  }

  findAll(): Promise<
    Prisma.UserGetPayload<{ omit: { password: true } }>[] | null
  > {
    return this.databaseService.user.findMany({
      omit: { password: true },
    })
  }

  findOne(
    id: string,
  ): Promise<Prisma.UserGetPayload<{ omit: { password: true } }> | null> {
    return this.databaseService.user.findUnique({
      where: { id },
      omit: { password: true },
      include: { company: true },
    })
  }

  findByEmail(
    email: string,
  ): Promise<Prisma.UserGetPayload<{ omit: { password: true } }> | null> {
    return this.databaseService.user.findUnique({
      where: { email },
      omit: { password: true },
    })
  }

  findByEmailWithPassword(
    email: string,
  ): Promise<Prisma.UserGetPayload<object> | null> {
    return this.databaseService.user.findUnique({
      where: { email },
    })
  }

  update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  remove(id: string) {
    return this.databaseService.user.delete({
      where: { id },
    })
  }
}
