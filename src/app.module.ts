import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MetroModule } from './metro/metro.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // 数据库模块
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST', '127.0.0.1'),
        port: configService.get('MYSQL_PORT', 3306),
        username: configService.get('MYSQL_USER', 'root'),
        password: configService.get('MYSQL_PASSWORD', '123456'),
        database: configService.get('MYSQL_DATABASE', 'smart_metro'),
        charset: 'utf8mb4',
        synchronize: false,
        logging: true,
        logger: 'file',
        entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      }),
      inject: [ConfigService],
    }),
    
    // 静态文件服务
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    
    // 文件上传配置
    MulterModule.register({
      dest: './static',
    }),
    
    // 业务模块
    MetroModule,
  ],
})
export class AppModule {}
