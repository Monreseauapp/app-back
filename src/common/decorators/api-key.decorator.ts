import { SetMetadata } from '@nestjs/common'

export const IS_API_KEY_PUBLIC = 'apiKeyPublic'
export const ApiKeyPublic = () => SetMetadata(IS_API_KEY_PUBLIC, true)
