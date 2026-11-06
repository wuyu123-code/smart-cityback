# Metro 后端服务 - Docker 部署指南

## 快速部署

### 1. 前置条件

确保已安装 **Docker Desktop** 并正常运行。

**中国大陆用户** 需要先配置 Docker 镜像加速器，否则可能无法拉取镜像。

#### 配置 Docker 镜像加速器（中国大陆用户）

1. 打开 Docker Desktop → Settings → Docker Engine
2. 修改 JSON 配置：

```json
{
  "registry-mirrors": [
    "https://docker.1panel.live",
    "https://hub.rat.dev",
    "https://docker.m.daocloud.io"
  ]
}
```

3. 点击 **Apply & Restart**

---

### 2. 一键部署

```bash
# 克隆项目后，进入项目目录
cd metro_backend

# 直接启动服务（会自动构建）
docker-compose up -d --build

# 查看日志
docker-compose logs -f
```

部署完成后访问：
- **API 服务**: http://localhost:8092
- **Swagger 文档**: http://localhost:8092/api-docs

---

## 自定义配置

如需修改端口、密码等配置，复制 `.env.example` 为 `.env` 并修改：

```bash
cp .env.example .env
```

### 可配置项

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `PORT` | 后端服务端口 | 8092 |
| `BACKEND_HOST_PORT` | 宿主机端口映射 | 8092:8092 |
| `MYSQL_ROOT_PASSWORD` | MySQL 根密码 | 123456 |
| `MYSQL_DATABASE` | 数据库名称 | smart_metro |
| `MYSQL_USER` | 数据库用户名 | root |
| `MYSQL_HOST_PORT` | MySQL 宿主机端口映射 | 3308:3306 |
| `AMAP_KEY` | 高德地图 API Key | - |

### 示例：修改端口

编辑 `.env` 文件：

```env
# 修改后端端口为 9000
PORT=9000
BACKEND_HOST_PORT=9000:9000

# 修改 MySQL 端口为 3310
MYSQL_HOST_PORT=3310:3306
```

然后重启：

```bash
docker-compose down
docker-compose up -d --build
```

---

## 常用命令

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看日志
docker-compose logs -f

# 查看服务状态
docker-compose ps

# 重新构建并启动
docker-compose up -d --build

# 删除所有数据（谨慎使用）
docker-compose down -v
```

---

## 服务说明

部署后运行两个容器：

| 容器名 | 服务 | 端口映射 | 说明 |
|--------|------|----------|------|
| metro-backend | NestJS 后端 | 8092:8092 | API 服务 |
| metro-mysql | MySQL 8.0 | 3308:3306 | 数据库 |

---

## 故障排查

### 1. 端口被占用

如果 8092 或 3308 端口已被占用，修改 `.env` 文件中的端口配置。

### 2. 数据库连接失败

确保 MySQL 容器已正常启动：

```bash
docker-compose ps
docker-compose logs mysql
```

### 3. 镜像拉取失败

配置 Docker 镜像加速器后重启 Docker Desktop。

### 4. 服务无法访问

检查防火墙设置，确保对应端口已开放。

---

## 数据持久化

MySQL 数据存储在 Docker 卷 `mysql-data` 中，即使删除容器数据也不会丢失。

如需导出数据：

```bash
# 导出数据库
docker exec metro-mysql mysqldump -u root -p123456 smart_metro > backup.sql

# 导入数据库
docker exec -i metro-mysql mysql -u root -p123456 smart_metro < backup.sql
```
