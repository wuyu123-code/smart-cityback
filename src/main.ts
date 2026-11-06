import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局响应编码为 UTF-8
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // 启用 CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 全局验证管道
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 配置 Swagger
  const config = new DocumentBuilder()
    .setTitle('Metro API')
    .setDescription('地铁线路 API 接口文档')
    .setVersion('1.0')
    .addTag('metro', '地铁线路相关接口')
    .addTag('upload', '文件上传相关接口')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // 静态文件服务
  const port = process.env.PORT || 8090;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api-docs`);
}
bootstrap();
