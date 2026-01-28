"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:3000',
            process.env.CORS_ORIGIN,
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
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
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
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
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
//# sourceMappingURL=main.js.map