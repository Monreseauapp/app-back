import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  // Validate required environment variables
  if (!process.env.API_KEY || process.env.API_KEY.trim() === '') {
    console.error(
      '❌ ERROR: API_KEY environment variable is required but not set',
    )

    console.log('Please set API_KEY in your environment variables or .env file')
    process.exit(1)
  }

  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [
      'http://localhost:8081',
      'http://localhost:3000',
      'http://192.168.1.87:3000',
      'http://192.168.1.87:8081',
      'http://ns3093511.ip-54-36-122.eu',
      'https://ns3093511.ip-54-36-122.eu',
      'http://54.36.122.34',
      'https://54.36.122.34',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
      'x-api-key',
    ],
  })

  const port = process.env.PORT || 3000
  const host = process.env.HOST || '0.0.0.0'

  await app.listen(port, host)
  console.log(`🚀 Application is running on: http://${host}:${port}`)
  console.log(`🔑 API Key protection is enabled`)
}

void bootstrap()
