import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from 'src/common/decorators/auth.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    if (this.hasValidApiKey(request)) {
      return true
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload: { email: string; id: string; iat: number; exp: number } =
        await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        })
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private hasValidApiKey(request: Request): boolean {
    const apiKeyHeader = request.headers['x-api-key'];
    const validApiKey = this.configService.get<string>('API_KEY');

    if (!validApiKey || validApiKey.trim() === '') {
      return false;
    }

    if (typeof apiKeyHeader === 'string') {
      return apiKeyHeader === validApiKey;
    } else if (Array.isArray(apiKeyHeader)) {
      return apiKeyHeader.includes(validApiKey);
    }

    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
