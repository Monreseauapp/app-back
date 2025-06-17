import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobDomainService } from './job-domain.service';
import { CreateJobDomainDto } from './dto/create-job-domain.dto';
import { UpdateJobDomainDto } from './dto/update-job-domain.dto';

@Controller('job-domain')
export class JobDomainController {
  constructor(private readonly jobDomainService: JobDomainService) {}

  @Post()
  create(@Body() createJobDomainDto: CreateJobDomainDto) {
    return this.jobDomainService.create(createJobDomainDto);
  }

  @Get()
  findAll() {
    return this.jobDomainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobDomainService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDomainDto: UpdateJobDomainDto) {
    return this.jobDomainService.update(+id, updateJobDomainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobDomainService.remove(+id);
  }
}
