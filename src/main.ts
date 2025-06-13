import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  if (!process.env.PORT) {
    console.warn('No PORT environment variable set, defaulting to 3000')
  }
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()