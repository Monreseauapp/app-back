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

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ temp_token: string; expires_in: string }> {
    const user = await this.usersService.findByEmailWithPassword(email)
    if (!user?.password) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const isMatch = await compare(pass, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const tempToken = await this.jwtService.signAsync(
      { email: user.email, id: user.id, temp: true },
      { expiresIn: 300 },
    )
    return {
      temp_token: tempToken,
      expires_in: '300',
    }
  }

  async verifyTempToken(
    tempToken: string,
  ): Promise<{ authorized: boolean; email: string; id: string }> {
    try {
      const decoded: { email: string; id: string; temp?: boolean } =
        await this.jwtService.verifyAsync(tempToken, {
          secret: process.env.JWT_SECRET,
        })
      return { authorized: true, email: decoded.email, id: decoded.id }
    } catch {
      throw new UnauthorizedException('Invalid or expired token')
    }
  }

  async doubleFactorAuth(
    email: string,
    passcode: string,
    tempToken: string,
  ): Promise<{ access_token: string; expires_in: string }> {
    try {
      const tempPayload: { email: string; id: string; temp?: boolean } =
        await this.jwtService.verifyAsync(tempToken)

      if (!tempPayload?.temp || tempPayload.email !== email) {
        throw new UnauthorizedException('Invalid or expired temp token')
      }
    } catch {
      throw new UnauthorizedException('Invalid or expired temp token')
    }

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
    const payload = {
      email: user.email,
      id: user.id,
      companyId: user.companyId,
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
      expires_in: process.env.JWT_EXPIRES_IN || '600',
    }
  }

  async verifyAccessToken(
    accessToken: string,
  ): Promise<{ email: string; id: string; companyId?: string }> {
    try {
      const decoded: { email: string; id: string; companyId?: string } =
        await this.jwtService.verifyAsync(accessToken, {
          secret: process.env.JWT_SECRET,
        })
      const user = await this.usersService.findByEmail(decoded.email)
      if (!user) {
        throw new UnauthorizedException('User not found')
      }
      if (user.companyId) {
        decoded.companyId = user.companyId
      }
      return {
        email: decoded.email,
        id: decoded.id,
        companyId: decoded.companyId,
      }
    } catch {
      throw new UnauthorizedException('Invalid or expired token')
    }
  }
}