import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { JobDomainService } from './job-domain.service'
import { Prisma } from 'generated/prisma'
import { AuthPublic } from 'src/common/decorators/auth.decorator'

@Controller('job-domain')
export class JobDomainController {
  constructor(private readonly jobDomainService: JobDomainService) {}

  @Post()
  create(@Body() createJobDomainDto: Prisma.JobDomainCreateInput) {
    return this.jobDomainService.create(createJobDomainDto)
  }

  @AuthPublic()
  @Get()
  findAll() {
    return this.jobDomainService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobDomainService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDomainDto: Prisma.JobDomainUpdateInput,
  ) {
    return this.jobDomainService.update(id, updateJobDomainDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobDomainService.remove(id)
  }
}
