import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MetroService } from '../services/metro.service';
import { success, failed } from '../../common/response';
import { LineData } from '../dto/line-response.dto';
import { StationInfoData } from '../dto/station-info-response.dto';
import { CarPositionResponse } from '../dto/car-position-response.dto';
import { TestPositionResponse } from '../dto/test-position-response.dto';

@ApiTags('metro')
@Controller('api/v1')
export class MetroController {
  constructor(private readonly metroService: MetroService) {}

  @Get('getLine')
  @ApiOperation({ summary: '获取所有线路信息' })
  @ApiResponse({ 
    status: 200, 
    description: '成功返回线路列表',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'number', example: 200 },
        message: { type: 'string', example: '成功' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: '轨道交通 1 号线' },
              basicPrice: { type: 'string', example: '2' },
              totalPrice: { type: 'string', example: '5' },
              length: { type: 'string', example: '38.5' },
              xs: { type: 'string', example: '114.22,114.23,114.24' },
              ys: { type: 'string', example: '30.55,30.56,30.57' },
              stationsList: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: '钟家村' },
                    xy_coords: { type: 'string', example: '114.22,30.55' },
                    peopleFlow: { type: 'number', example: 75 },
                    isChange: { type: 'number', example: 1 },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async getLine() {
    try {
      const result = await this.metroService.getLine();
      return success('成功', result);
    } catch (error) {
      return failed('获取数据失败');
    }
  }

  @Get('getStationInfo')
  @ApiOperation({ summary: '获取站点信息' })
  @ApiQuery({ name: 'name', description: '站点名称', example: '钟家村' })
  @ApiResponse({ 
    status: 200, 
    description: '成功返回站点信息',
    type: StationInfoData,
  })
  async getStationInfo(@Query('name') name: string) {
    if (!name) {
      return failed('请输入站点名称');
    }
    try {
      const result = await this.metroService.getStationInfo(name);
      return success('成功', result);
    } catch (error) {
      return failed('获取失败');
    }
  }

  @Get('getCarPosition')
  @ApiOperation({ summary: '获取列车位置' })
  @ApiQuery({ name: 'id', description: '线路 ID', example: '1' })
  @ApiResponse({ 
    status: 200, 
    description: '成功返回列车位置坐标',
    type: CarPositionResponse,
  })
  async getCarPosition(@Query('id') id: string) {
    if (!id) {
      return failed('请输入线路 ID');
    }
    try {
      const result = await this.metroService.getCarPosition(id);
      return success('成功', result);
    } catch (error) {
      return failed('获取数据失败');
    }
  }

  @Get('test')
  @ApiOperation({ summary: '测试位置 - 获取东风公司站点' })
  @ApiResponse({ 
    status: 200, 
    description: '成功返回东风公司站点信息',
    type: TestPositionResponse,
  })
  async testPosition() {
    try {
      const result = await this.metroService.testPosition();
      return success('成功', result);
    } catch (error) {
      return failed('获取数据失败');
    }
  }
}
