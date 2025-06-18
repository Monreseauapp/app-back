import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyProjectService } from './company-project.service';
import { Prisma } from 'generated/prisma';

@Controller('company-project')
export class CompanyProjectController {
  constructor(private readonly companyProjectService: CompanyProjectService) {}

  @Post()
  create(@Body() createCompanyProjectDto: Prisma.CompanyProjectCreateInput) {
    return this.companyProjectService.create(createCompanyProjectDto);
  }

  @Get()
  findAll() {
    return this.companyProjectService.findAll();
  }

  @Get(':projectId/:companyId')
  findOne(
    @Param('projectId') projectId: string,
    @Param('companyId') companyId: string
  ) {
    return this.companyProjectService.findOne(projectId, companyId);
  }

  @Patch(':projectId/:companyId')
  update(
    @Param('projectId') projectId: string,
    @Param('companyId') companyId: string,
    @Body() updateCompanyProjectDto: Prisma.CompanyProjectUpdateInput
  ) {
    return this.companyProjectService.update(projectId, companyId, updateCompanyProjectDto);
  }

  @Delete(':projectId/:companyId')
  remove(
    @Param('projectId') projectId: string,
    @Param('companyId') companyId: string
  ) {
    return this.companyProjectService.remove(projectId, companyId);
  }
}
