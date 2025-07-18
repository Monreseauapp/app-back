import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { IS_PUBLIC_KEY } from '../decorators/api-key.decorator'
import { Request } from 'express'
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    console.log('🔍 ApiKeyGuard - isPublic:', isPublic)

    if (isPublic) return true

    const request: Request = context.switchToHttp().getRequest<Request>()
    const apiKeyHeader = request.headers['x-api-key']
    const validApiKey = this.configService.get<string>('API_KEY')

    if (!apiKeyHeader || apiKeyHeader !== validApiKey) {
      console.log('❌ ApiKeyGuard - Invalid or missing API key')
      throw new UnauthorizedException('Invalid or missing API key')
    }
    return true
  }
}
