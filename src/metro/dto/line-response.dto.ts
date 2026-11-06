import { ApiProperty } from '@nestjs/swagger';

export class StationType {
  @ApiProperty({ description: '站点名称', example: '钟家村' })
  name: string;

  @ApiProperty({ description: 'XY 坐标', example: '114.22,30.55' })
  xy_coords: string;

  @ApiProperty({ description: '客流量', example: 75 })
  peopleFlow: number;

  @ApiProperty({ description: '是否换乘站 1 是 0 否', example: 1 })
  isChange: number;
}

export class LineData {
  @ApiProperty({ description: '线路 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '线路名称', example: '轨道交通 1 号线' })
  name: string;

  @ApiProperty({ description: '基础票价', example: '2' })
  basicPrice: string;

  @ApiProperty({ description: '总票价', example: '5' })
  totalPrice: string;

  @ApiProperty({ description: '线路长度', example: '38.5' })
  length: string;

  @ApiProperty({ description: 'X 坐标集合', example: '114.22,114.23,114.24' })
  xs: string;

  @ApiProperty({ description: 'Y 坐标集合', example: '30.55,30.56,30.57' })
  ys: string;

  @ApiProperty({ description: '站点列表', type: [StationType] })
  stationsList: StationType[];
}

export class LineResponseData {
  @ApiProperty({ description: '线路列表', type: [LineData] })
  data: LineData[];
}
