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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: (() => {
        if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
          throw new Error(
            'JWT_SECRET environment variable is not set or is empty. The application cannot start.',
          )
        }
        return process.env.JWT_SECRET
      })(),

    }
    super(options)
  }

  validate(payload: JwtPayload): { userId: string; email: string } {
    return { userId: payload.sub, email: payload.email }
  }
}
