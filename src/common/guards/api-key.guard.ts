import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { IS_API_KEY_PUBLIC } from '../decorators/api-key.decorator'
import { Request } from 'express'
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_API_KEY_PUBLIC,
      [context.getHandler(), context.getClass()],
    )

    if (isPublic) return true

    const request: Request = context.switchToHttp().getRequest<Request>()
    const apiKeyHeader = request.headers['x-api-key']
    const validApiKey = this.configService.get<string>('API_KEY')

    if (!validApiKey || validApiKey.trim() === '') {
      throw new UnauthorizedException(
        'Server misconfiguration: API key is not set',
      )
    }
    if (!apiKeyHeader || apiKeyHeader !== validApiKey) {
      throw new UnauthorizedException('Invalid or missing API key')
    }

    console.log(validApiKey, apiKeyHeader)
    return true
  }
}
