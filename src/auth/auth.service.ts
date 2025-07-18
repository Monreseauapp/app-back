import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { Totp } from 'time2fa'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ authorized: boolean }> {
    const user = await this.usersService.findByEmail(email)
    if (!user?.password) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return compare(pass, user?.password).then((isMatch) => {
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials')
      }
      return {
        authorized: true,
      }
    })
  }

  async doubleFactorAuth(
    email: string,
    passcode: string,
  ): Promise<{ access_token: string; expires_in: string }> {
    const user = await this.usersService.findByEmail(email)
    if (!user || !user.twoFaSecret) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const isValid = Totp.validate({
      secret: user.twoFaSecret,
      passcode: passcode,
    })
    if (!isValid) {
      throw new UnauthorizedException('Invalid 2FA token')
    }
    const payload = { email: user.email, id: user.id }
    return {
      access_token: await this.jwtService.signAsync(payload),
      expires_in: process.env.JWT_EXPIRES_IN || '600',
    }
  }
}
