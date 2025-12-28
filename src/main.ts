import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:5173', // Vite dev server
      'http://localhost:3000', // Alternative dev server
      'http://127.0.0.1:5173', // Alternative localhost
      'http://127.0.0.1:3000', // Alternative localhost
      process.env.CORS_ORIGIN, // From environment variable
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cache-Control',
      'Pragma',
    ],
    exposedHeaders: ['Authorization'],
    maxAge: 3600,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Global prefix
  app.setGlobalPrefix('api');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Madrassa Management System API')
    .setDescription('NOORUL HUDA Higher Secondary Madrassa Management System API Documentation')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('students', 'Student management endpoints')
    .addTag('ustads', 'Ustad (Teacher) management endpoints')
    .addTag('classes', 'Class division management endpoints')
    .addTag('academic-years', 'Academic year management endpoints')
    .addTag('attendance', 'Attendance tracking endpoints')
    .addTag('prayer', 'Prayer tracking endpoints')
    .addTag('results', 'Exam results management endpoints')
    .addTag('announcements', 'Announcement management endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Madrassa Management System API running on port ${port}`);
  console.log(`📚 NOORUL Huda Higher Secondary Madrassa`);
  console.log(`🔗 API Documentation: http://localhost:${port}/docs`);
  console.log(`📖 Swagger UI: http://localhost:${port}/docs`);
}
bootstrap();
