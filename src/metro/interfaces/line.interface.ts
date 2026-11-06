import { ApiProperty } from '@nestjs/swagger';

export class StationType {
  @ApiProperty({ description: '站点名称' })
  name: string;

  @ApiProperty({ description: 'XY 坐标' })
  xy_coords: string;

  @ApiProperty({ description: '客流量' })
  peopleFlow: number;

  @ApiProperty({ description: '是否换乘站 1 是 0 否' })
  isChange: number;
}

export class LineResponse {
  @ApiProperty({ description: '线路 ID' })
  id: number;

  @ApiProperty({ description: '线路名称' })
  name: string;

  @ApiProperty({ description: '基础票价' })
  basicPrice: string;

  @ApiProperty({ description: '总票价' })
  totalPrice: string;

  @ApiProperty({ description: '线路长度' })
  length: string;

  @ApiProperty({ description: 'X 坐标集合' })
  xs: string;

  @ApiProperty({ description: 'Y 坐标集合' })
  ys: string;

  @ApiProperty({ description: '站点列表', type: [StationType] })
  stationsList: StationType[];
}
