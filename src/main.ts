import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: [
      'http://localhost:8081',
      'http://localhost:3000',
      'http://ns3093511.ip-54-36-122.eu/',
      'http://54.36.122.34',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  })

  const port = process.env.PORT || 3000
  const host = process.env.HOST || '0.0.0.0'

  await app.listen(port, host)
  console.log(`🚀 Application is running on: http://${host}:${port}/api`)
}

void bootstrap()
