import { ApiProperty } from '@nestjs/swagger';
import { StationType } from './line-response.dto';

export class TestPositionResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '消息', example: '成功' })
  message: string;

  @ApiProperty({ description: '东风公司站点信息列表', type: [StationType] })
  data: StationType[];
}
