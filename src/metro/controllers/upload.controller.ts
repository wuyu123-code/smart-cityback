import { Controller, Post, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { success } from '../../common/response';
import { join } from 'path';
import { mkdir } from 'fs/promises';

@ApiTags('upload')
@Controller('api/v1')
export class UploadController {
  @Post('upload')
  @ApiOperation({ summary: '文件上传（仅支持图片：jpg, png, gif, jpeg）' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '图片文件（jpg, png, gif, jpeg），最大 5MB',
        },
      },
    },
  })
  @ApiResponse({ 
    status: 200, 
    description: '成功返回文件路径',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'number', example: 200 },
        message: { type: 'string', example: '成功' },
        data: { type: 'string', example: '/static/20260421/1234567890.png' },
      },
    },
  })
  @ApiResponse({ 
    status: 400, 
    description: '文件类型不合法或文件过大',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'number', example: 400 },
        message: { type: 'string', example: '文件类型不合法' },
        data: { type: 'null', example: null },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: require('multer').diskStorage({
      destination: async (req, file, cb) => {
        const day = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const dir = join(process.cwd(), 'static', day);
        try {
          await mkdir(dir, { recursive: true });
          cb(null, dir);
        } catch (error) {
          cb(error, null);
        }
      },
      filename: (req, file, cb) => {
        const ext = require('path').extname(file.originalname);
        const name = `${Date.now()}${ext}`;
        cb(null, name);
      },
    }),
    fileFilter: (req, file, cb) => {
      const allowedExts = ['.jpg', '.png', '.gif', '.jpeg'];
      const ext = require('path').extname(file.originalname).toLowerCase();
      if (allowedExts.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error('文件类型不合法'), false);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { code: 400, message: '请选择要上传的文件', data: null };
    }

    // 返回相对路径
    const relativePath = file.path.replace(process.cwd(), '').replace(/\\/g, '/');
    return success('成功', relativePath);
  }

  @Get('pong')
  @ApiOperation({ summary: 'Ping 测试' })
  @ApiResponse({ 
    status: 200, 
    description: '成功返回 pong',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'number', example: 200 },
        message: { type: 'string', example: '成功' },
        data: { type: 'string', example: 'pong' },
      },
    },
  })
  pong() {
    return success('成功', 'pong');
  }
}
