import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthPublic } from 'src/common/decorators/auth.decorator'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthPublic()
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }

  @AuthPublic()
  @Post('verify-temp-token')
  verifyTempToken(@Body() verifyTokenDto: Record<string, string>) {
    return this.authService.verifyTempToken(verifyTokenDto.token)
  }

  @AuthPublic()
  @Post('verify-token')
  verifyAccessToken(@Body() verifyTokenDto: Record<string, string>) {
    return this.authService.verifyAccessToken(verifyTokenDto.token)
  }

  @AuthPublic()
  @Post('2fa')
  doubleFactorAuth(@Body() twoFaDto: Record<string, string>) {
    return this.authService.doubleFactorAuth(twoFaDto.email, twoFaDto.passcode, twoFaDto.tempToken)
  }
}
