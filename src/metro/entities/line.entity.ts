import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('line')
export class Line {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '线路 ID' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: '线路名称' })
  name: string;

  @Column({ type: 'varchar', length: 50, name: 'basic_price' })
  @ApiProperty({ description: '基础票价' })
  basicPrice: string;

  @Column({ type: 'varchar', length: 50, name: 'total_price' })
  @ApiProperty({ description: '总票价' })
  totalPrice: string;

  @Column({ type: 'varchar', length: 50 })
  @ApiProperty({ description: '线路长度' })
  length: string;

  @Column({ type: 'text', name: 'xs' })
  @ApiProperty({ description: 'X 坐标集合' })
  xs: string;

  @Column({ type: 'text', name: 'ys' })
  @ApiProperty({ description: 'Y 坐标集合' })
  ys: string;

  @Column({ type: 'text' })
  @ApiProperty({ description: '站点 JSON 数据' })
  stations: string;
}
