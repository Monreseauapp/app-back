import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiKeyPublic } from './common/decorators/api-key.decorator'
import { AuthPublic } from './common/decorators/auth.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @ApiKeyPublic()
  @AuthPublic()
  @Get('health')
  getHealth() {
    return { status: 'ok' }
  }

  // Removed the `getProtected` method and its associated route.
}
