import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Line } from '../entities/line.entity';
import { LineResponse, StationType } from '../interfaces/line.interface';

@Injectable()
export class MetroService {
  private readonly logger = new Logger(MetroService.name);
  private readonly changeStations = [
    '钟家村', '大智路', '王家湾', '宏图大道', '常青花园', '范湖',
    '王家墩东', '江汉路', '街道口', '宗关', '码头潭公园', '园博园北',
    '巨龙大道', '黄浦路', '循礼门', '武昌火车站', '螃蟹岬', '徐家棚',
    '岳家嘴', '洪山广场', '野芷湖', '积玉桥', '复兴路', '中南路',
    '武汉商务区', '赵家条', '香港路', '三阳路', '东风公司',
  ];

  constructor(
    @InjectRepository(Line)
    private readonly lineRepository: Repository<Line>,
  ) {}

  /**
   * 获取所有线路信息
   */
  async getLine(): Promise<LineResponse[]> {
    try {
      this.logger.log('开始查询线路数据...');
      const lines = await this.lineRepository.find();
      this.logger.log(`查询到 ${lines.length} 条线路`);
      const result: LineResponse[] = [];

      for (const line of lines) {
        const stationsList: StationType[] = JSON.parse(line.stations || '[]');

        for (const station of stationsList) {
          // 随机生成客流量
          station.peopleFlow = Math.floor(Math.random() * 100);
          // 判断是否是换乘站
          station.isChange = this.changeStations.includes(station.name) ? 1 : 0;
        }

        result.push({
          id: line.id,
          name: line.name,
          basicPrice: line.basicPrice,
          totalPrice: line.totalPrice,
          length: line.length,
          xs: line.xs,
          ys: line.ys,
          stationsList,
        });
      }

      return result;
    } catch (error) {
      this.logger.error('查询线路数据失败', error);
      throw error;
    }
  }

  /**
   * 获取站点信息
   */
  async getStationInfo(name: string): Promise<{ address: string; peopleFlow: number }> {
    const lines = await this.lineRepository.createQueryBuilder('line')
      .where('line.stations LIKE :name', { name: `%${name}%` })
      .getMany();

    let address = '';
    for (const line of lines) {
      // 移除"轨道交通"前缀
      const stationName = line.name.replace('轨道交通', '');
      if (address === '') {
        address = stationName;
      } else {
        address += ';' + stationName;
      }
    }

    return {
      address,
      peopleFlow: Math.floor(Math.random() * 100),
    };
  }

  /**
   * 获取列车位置
   */
  async getCarPosition(id: string): Promise<string> {
    const line = await this.lineRepository.findOne({ where: { id: parseInt(id) } });
    
    if (!line) {
      throw new Error('线路不存在');
    }

    const xrr = line.xs.split(',');
    const yrr = line.ys.split(',');
    const index = Math.floor(Math.random() * (xrr.length * 3 / 4));

    return `${xrr[index]},${yrr[index]}`;
  }

  /**
   * 测试位置（获取东风公司站点）
   */
  async testPosition(): Promise<StationType[]> {
    const lines = await this.lineRepository.createQueryBuilder('line')
      .where('line.stations LIKE :name', { name: '%东风公司%' })
      .getMany();

    const result: StationType[] = [];

    for (const line of lines) {
      const stationsList: StationType[] = JSON.parse(line.stations || '[]');
      
      for (const station of stationsList) {
        if (station.name === '东风公司') {
          station.peopleFlow = line.id;
          result.push(station);
        }
      }
    }

    return result;
  }
}
