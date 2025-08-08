import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { RecommandationService } from './recommandation.service'
import { Prisma } from 'generated/prisma'

@Controller('recommandation')
export class RecommandationController {
  constructor(private readonly recommandationService: RecommandationService) {}

  @Post()
  create(
    @Body()
    createRecommandationDto: Prisma.RecommandationUncheckedCreateInput,
  ) {
    return this.recommandationService.create(createRecommandationDto)
  }

  @Get()
  findAll() {
    return this.recommandationService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommandationService.findOne(id)
  }

  @Get('recipient/:recipientId')
  findByRecipientId(@Param('recipientId') recipientId: string) {
    return this.recommandationService.findByRecipientId(recipientId)
  }

  @Get('initiator/:initiatorId')
  findByInitiatorId(@Param('initiatorId') initiatorId: string) {
    return this.recommandationService.findByInitiatorId(initiatorId)
  }

  @Get('company/:companyId')
  findByCompanyId(@Param('companyId') companyId: string) {
    return this.recommandationService.findByCompanyId(companyId)
  }

  @Get('company-initiators/:companyId')
  findAllByCompanyInitiators(@Param('companyId') companyId: string) {
    return this.recommandationService.findAllByCompanyInitiators(companyId)
  }

  @Get('company-recipients/:companyId')
  findAllByCompanyRecipients(@Param('companyId') companyId: string) {
    return this.recommandationService.findAllByCompanyRecipients(companyId)
  }

  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.recommandationService.findAllRecommandationsByUserId(userId)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecommandationDto: Prisma.RecommandationUpdateInput,
  ) {
    return this.recommandationService.update(id, updateRecommandationDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommandationService.remove(id)
  }
}
