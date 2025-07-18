import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { Prisma } from 'generated/prisma'
import { genSalt, hash } from 'bcryptjs'
import { AuthPublic } from 'src/common/decorators/auth.decorator'
import { Totp } from 'time2fa'
import * as qrcode from 'qrcode'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AuthPublic()
  @Post()
  async create(@Body() createUserDto: Prisma.UserCreateInput) {
    const salt = await genSalt(10)
    createUserDto.password = await hash(createUserDto.password, salt)
    const key = Totp.generateKey({
      issuer: 'Mon Réseau',
      user: createUserDto.email,
    })
    createUserDto.twoFaSecret = key.secret
    const qrCode: string | undefined = await qrcode
      .toDataURL(key.url)
      .catch((err) => {
        console.error('Error generating QR code:', err)
        return undefined
      })
    const user = await this.usersService.create(createUserDto)
    return {
      message: 'User created successfully',
      id: user.id,
      qrCode,
      secret: key.secret,
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @AuthPublic()
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email)
  }

  @Get(':id/company')
  findUserCompany(@Param('id') id: string) {
    return this.usersService.findUserCompany(id)
  }

  @AuthPublic()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
