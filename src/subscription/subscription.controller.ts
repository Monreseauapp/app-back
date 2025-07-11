import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { SubscriptionService } from './subscription.service'
import { Prisma } from 'generated/prisma'

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() createSubscriptionDto: Prisma.SubscriptionCreateInput) {
    return this.subscriptionService.create(createSubscriptionDto)
  }

  @Get()
  findAll() {
    return this.subscriptionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: Prisma.SubscriptionUpdateInput,
  ) {
    return this.subscriptionService.update(id, updateSubscriptionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionService.remove(id)
  }
}
