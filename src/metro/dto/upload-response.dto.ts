import { ApiProperty } from '@nestjs/swagger';

export class UploadResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '消息', example: '成功' })
  message: string;

  @ApiProperty({ description: '文件保存路径', example: '/static/20260421/1234567890.png' })
  data: string;
}

export class PongResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '消息', example: '成功' })
  message: string;

  @ApiProperty({ description: '返回数据', example: 'pong' })
  data: string;
}
