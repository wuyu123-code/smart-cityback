import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetroController } from './controllers/metro.controller';
import { MetroService } from './services/metro.service';
import { Line } from './entities/line.entity';
import { LinePlanController } from './controllers/line-plan.controller';
import { LinePlanService } from './services/line-plan.service';
import { HttpModule } from '@nestjs/axios';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Line]), HttpModule],
  controllers: [MetroController, LinePlanController, UploadController],
  providers: [MetroService, LinePlanService, UploadService],
  exports: [MetroService, LinePlanService],
})
export class MetroModule {}
