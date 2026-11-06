import { ApiProperty } from '@nestjs/swagger';

export class StationInfoData {
  @ApiProperty({ description: '站点地址，多个站点用分号分隔', example: '1 号线;2 号线' })
  address: string;

  @ApiProperty({ description: '客流量', example: 65 })
  peopleFlow: number;
}

export class StationInfoResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '消息', example: '成功' })
  message: string;

  @ApiProperty({ description: '站点信息数据', type: StationInfoData })
  data: StationInfoData;
}
