import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { mkdir } from 'fs/promises';

@Injectable()
export class UploadService {
  /**
   * 获取 multer 配置
   */
  getMulterOptions() {
    return {
      storage: diskStorage({
        destination: async (req, file, cb) => {
          // 生成日期目录
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
          // 生成唯一文件名
          const ext = extname(file.originalname);
          const name = `${Date.now()}${ext}`;
          cb(null, name);
        },
      }),
      fileFilter: (req, file, cb) => {
        // 验证文件类型
        const allowedExts = ['.jpg', '.png', '.gif', '.jpeg'];
        const ext = extname(file.originalname).toLowerCase();
        
        if (allowedExts.includes(ext)) {
          cb(null, true);
        } else {
          cb(new Error('文件类型不合法'), false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 限制 5MB
      },
    };
  }

  /**
   * 文件拦截器
   */
  fileInterceptor() {
    return FileInterceptor('file', this.getMulterOptions());
  }
}
