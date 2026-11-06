import { ApiProperty } from '@nestjs/swagger';

export class Response<T = any> {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '消息', example: '成功' })
  message: string;

  @ApiProperty({ description: '数据' })
  data: T;

  constructor(code: number, message: string, data: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export class PageResponse<T = any> {
  @ApiProperty({ description: '总数' })
  total: number;

  @ApiProperty({ description: '列表数据' })
  list: T;

  constructor(total: number, list: T) {
    this.total = total;
    this.list = list;
  }
}

export function success<T>(message: string, data: T): Response<T> {
  return new Response(200, message, data);
}

export function failed(message: string): Response<any> {
  return new Response(400, message, null);
}

export function successPage<T>(message: string, data: T, total: number): Response<PageResponse<T>> {
  return new Response(200, message, new PageResponse(total, data));
}
