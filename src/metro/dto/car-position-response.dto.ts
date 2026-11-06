import { ApiProperty } from '@nestjs/swagger';

export class CarPositionResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '消息', example: '成功' })
  message: string;

  @ApiProperty({ description: '列车位置坐标（经度，纬度）', example: '114.22,30.55' })
  data: string;
}
