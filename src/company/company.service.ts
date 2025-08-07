import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { Prisma } from 'generated/prisma'
import { StripeService } from 'src/stripe/stripe.service'

@Injectable()
export class CompanyService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly stripeService: StripeService,
  ) {}

  async create(createCompanyDto: Prisma.CompanyCreateInput) {
    if (createCompanyDto.email) {
      const existingCompanyByEmail = await this.databaseService.company.findUnique({
        where: { email: createCompanyDto.email as string },
      })
      if (existingCompanyByEmail) {
        return { error: 'Adresse email déjà utilisée' }
      }
    }

    if (createCompanyDto.phone) {
      const existingCompanyByPhone = await this.databaseService.company.findUnique({
        where: { phone: createCompanyDto.phone as string },
      })
      if (existingCompanyByPhone) {
        return { error: 'Numéro de téléphone déjà utilisé' }
      }
    }
    return this.databaseService.company.create({
      data: createCompanyDto,
    })
  }

  findAll() {
    return this.databaseService.company.findMany()
  }

  findOne(id: string) {
    return this.databaseService.company.findUnique({
      where: { id },
    })
  }

  findAllUsers(id: string) {
    return this.databaseService.company.findUnique({
      where: { id },
      include: { users: true },
    })
  }

  findByEmail(email: string) {
    return this.databaseService.company.findUnique({
      where: { email },
    })
  }

  async findCompanyPaymentMethods(id: string) {
    const company = await this.databaseService.company.findUnique({
      where: { id },
      select: { stripeCustomerId: true },
    })
    if (!company?.stripeCustomerId) {
      return []
    }
    const paymentMethods = await this.stripeService.retrievePaymentMethod(
      company.stripeCustomerId,
    )
    if (!paymentMethods) {
      return []
    }
    return paymentMethods.data
  }

  async findCustomerByUserId(id: string) {
    const company = await this.databaseService.company.findUnique({
      where: { id },
      select: { stripeCustomerId: true },
    })
    if (!company?.stripeCustomerId) {
      return null
    }
    return this.stripeService.retrieveCustomer(company.stripeCustomerId)
  }

  update(id: string, updateCompanyDto: Prisma.CompanyUpdateInput) {
    return this.databaseService.company.update({
      where: { id },
      data: updateCompanyDto,
    })
  }

  remove(id: string) {
    return this.databaseService.company.delete({
      where: { id },
    })
  }
}
