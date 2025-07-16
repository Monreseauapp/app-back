import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'

export interface JwtPayload {
  email: string
  sub: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as (
        req: Request,
      ) => string | null,
      secretOrKey: (process.env.JWT_SECRET as string) || '',
    }
    super(options)
  }

  validate(payload: JwtPayload): { userId: string; email: string } {
    return { userId: payload.sub, email: payload.email }
  }
}
