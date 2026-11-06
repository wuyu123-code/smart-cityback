# Nest Metro API

基于 NestJS 重写的地铁线路 API 服务，与原 Go 项目保持接口字段和数据库对接一致。

## 项目结构

```
nest-metro/
├── src/
│   ├── common/           # 公共模块
│   │   └── response.ts   # 响应格式化
│   ├── metro/            # 地铁业务模块
│   │   ├── controllers/  # 控制器
│   │   ├── services/     # 服务层
│   │   ├── entities/     # 数据库实体
│   │   ├── interfaces/   # 接口定义
│   │   └── metro.module.ts
│   ├── app.module.ts     # 根模块
│   └── main.ts           # 入口文件
├── .env                  # 环境变量配置
├── .env.example          # 环境变量示例
└── tsconfig.json         # TypeScript 配置
```

## 安装依赖

```bash
npm install
```

## 配置

复制 `.env.example` 为 `.env` 并修改配置：

```env
# 高德地图 API Key
AMAP_KEY=your_amap_key

# 服务器端口
PORT=8090

# MySQL 数据库配置
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=smart_metro
```

## 运行

```bash
# 开发模式
npm run start:dev

# 生产模式
npm run build
npm run start:prod
```

## API 接口

### Swagger 文档
访问 `http://localhost:8090/api-docs` 查看完整的 API 接口文档。

### 1. 获取线路信息
```
GET /api/v1/getLine
```

### 2. 获取站点信息
```
GET /api/v1/getStationInfo?name=站点名称
```

### 3. 获取线路规划
```
GET /api/v1/getLinePlan?origin=起点坐标&destination=终点坐标
```

### 4. 获取列车位置
```
GET /api/v1/getCarPosition?id=线路 ID
```

### 5. 测试位置
```
GET /api/v1/test
```

### 6. 文件上传
```
POST /api/v1/upload
Content-Type: multipart/form-data

参数：file (图片文件)
```

### 7. Ping 测试
```
GET /api/v1/pong
```

## 响应格式

```json
{
  "code": 200,
  "message": "成功",
  "data": {}
}
```

## 技术栈

- NestJS - 后端框架
- TypeORM - ORM 框架
- MySQL - 数据库
- Axios - HTTP 请求
- Multer - 文件上传
- Swagger - API 文档
