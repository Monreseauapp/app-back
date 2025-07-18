import { SetMetadata } from '@nestjs/common'

export const API_KEY_PUBLIC_KEY = 'apiKeyPublic'
export const ApiKeyPublic = () => SetMetadata(API_KEY_PUBLIC_KEY, true)
