import { Injectable } from '@nestjs/common'
import { Prisma } from 'generated/prisma'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: Prisma.UserCreateInput) {
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

  findUserCompany(
    id: string,
  ): Promise<Prisma.UserGetPayload<{ include: { company: true } }> | null> {
    return this.databaseService.user.findUnique({
      where: { id },
      include: { company: true },
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
