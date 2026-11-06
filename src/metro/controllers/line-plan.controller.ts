import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { LinePlanService } from '../services/line-plan.service';
import { success, failed } from '../../common/response';

@ApiTags('metro')
@Controller('api/v1')
export class LinePlanController {
  constructor(private readonly linePlanService: LinePlanService) {}

  @Get('getLinePlan')
  @ApiOperation({ summary: '获取线路规划（高德地图 API）' })
  @ApiQuery({ name: 'origin', description: '起点坐标（经度，纬度）', example: '114.22,30.55' })
  @ApiQuery({ name: 'destination', description: '终点坐标（经度，纬度）', example: '114.30,30.60' })
  @ApiResponse({ 
    status: 200, 
    description: '成功返回线路规划信息',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'number', example: 200 },
        message: { type: 'string', example: '成功' },
        data: {
          type: 'object',
          properties: {
            cost: { type: 'string', example: '4' },
            duration: { type: 'string', example: '45' },
            distance: { type: 'string', example: '15000' },
            segments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  bus: {
                    type: 'object',
                    properties: {
                      buslines: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string', example: 'B12345' },
                            name: { type: 'string', example: '轨道交通 1 号线' },
                            start: { type: 'string', example: '汉口北' },
                            end: { type: 'string', example: '径河' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async getLinePlan(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
  ) {
    if (!origin) {
      return failed('请输入起点坐标');
    }
    if (!destination) {
      return failed('请输入终点坐标');
    }

    try {
      const result = await this.linePlanService.getLinePlan(origin, destination);
      return success('成功', result);
    } catch (error) {
      return failed(error.message || '获取数据失败');
    }
  }
}
