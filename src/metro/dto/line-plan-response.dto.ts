import { ApiProperty } from '@nestjs/swagger';

export class Busline {
  @ApiProperty({ description: '公交线路 ID', example: 'B12345' })
  id?: string;

  @ApiProperty({ description: '公交线路名称', example: '轨道交通 1 号线' })
  name?: string;

  @ApiProperty({ description: '起点站', example: '汉口北' })
  start?: string;

  @ApiProperty({ description: '终点站', example: '径河' })
  end?: string;
}

export class Bus {
  @ApiProperty({ description: '公交线路信息', type: [Busline] })
  buslines: Busline[];
}

export class Segment {
  @ApiProperty({ description: '公交信息' })
  bus: Bus;
}

export class Transit {
  @ApiProperty({ description: '费用', example: '4' })
  cost: string;

  @ApiProperty({ description: '预计耗时（分钟）', example: '45' })
  duration: string;

  @ApiProperty({ description: '距离（米）', example: '15000' })
  distance: string;

  @ApiProperty({ description: '路段信息', type: [Segment] })
  segments: Segment[];
}

export class LinePlanData {
  @ApiProperty({ description: '换乘方案列表', type: [Transit] })
  transits: Transit[];
}

export class LinePlanResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '消息', example: '成功' })
  message: string;

  @ApiProperty({ description: '线路规划数据', type: LinePlanData })
  data: LinePlanData;
}
