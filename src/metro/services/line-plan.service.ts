import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface PlanInfo {
  status: string;
  route: RouteType;
}

export interface RouteType {
  transits: PlanType[];
}

export interface PlanType {
  cost: string;
  duration: string;
  distance: string;
  segments: SegmentsType[];
}

export interface SegmentsType {
  bus: BusType;
}

export interface BusType {
  buslines: any[];
}

@Injectable()
export class LinePlanService {
  private readonly amapKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.amapKey = this.configService.get<string>('AMAP_KEY', '');
  }

  /**
   * 获取线路规划
   */
  async getLinePlan(origin: string, destination: string): Promise<any> {
    const url = `https://restapi.amap.com/v5/direction/transit/integrated?origin=${origin}&show_fields=polyline&destination=${destination}&strategy=7&city1=420100&city2=420100&key=${this.amapKey}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data as PlanInfo;

      if (data.status === '1') {
        // 过滤掉空的 buslines
        if (data.route?.transits?.[0]?.segments) {
          data.route.transits[0].segments = data.route.transits[0].segments.filter(
            (segment: SegmentsType) => {
              const buslinesStr = JSON.stringify(segment.bus?.buslines || []);
              return buslinesStr !== '[]';
            },
          );
        }
        return data.route.transits[0];
      } else {
        throw new Error('访问次数限制或参数错误');
      }
    } catch (error) {
      throw new Error('获取数据失败');
    }
  }
}
