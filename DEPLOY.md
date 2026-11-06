# Docker 部署指南

## 前提条件
- 安装 Docker Desktop
- 配置 Docker 镜像加速器（中国大陆用户必需）

## ⚠️ 重要：配置 Docker 镜像加速器

由于 Docker Hub 在中国大陆访问受限，必须先配置镜像加速器。

### Windows Docker Desktop 配置方法：

1. 打开 Docker Desktop
2. 点击右上角 **⚙️ Settings**（设置）
3. 选择左侧 **Docker Engine**
4. 将右侧 JSON 内容替换为以下内容：

```json
{
  "builder": {
    "entitlements": ["network.host"]
  },
  "registry-mirrors": [
    "https://docker.1panel.live",
    "https://hub.rat.dev",
    "https://docker.m.daocloud.io"
  ],
  "live-restore": false
}
```

5. 点击 **Apply & Restart** 应用并重启 Docker Desktop

> 💡 如果上述镜像源不可用，可尝试其他镜像源：
> - `https://docker.1panel.live`
> - `https://hub.rat.dev`
> - `https://docker.m.daocloud.io`
> - `https://docker.anyhub.us.kg`
> - `https://dockerhub.jobcher.com`

## 部署步骤

### 方式一：使用 Docker Compose（推荐）

```bash
# 1. 构建并启动所有服务
docker-compose up -d --build

# 2. 查看日志
docker-compose logs -f

# 3. 停止服务
docker-compose down

# 4. 停止并删除数据卷（谨慎使用）
docker-compose down -v
```

### 方式二：单独构建和运行

```bash
# 1. 构建镜像
docker build -t metro-backend .

# 2. 运行容器
docker run -d \
  --name metro-backend \
  -p 8090:8090 \
  -e NODE_ENV=production \
  -e PORT=8090 \
  -e AMAP_KEY=3dacceca72db0f91c59baeedc4257028 \
  -e MYSQL_HOST=host.docker.internal \
  -e MYSQL_PORT=3306 \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=_Aa750324 \
  -e MYSQL_DATABASE=smart_metro \
  metro-backend
```

## 环境变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| NODE_ENV | 运行环境 | production |
| PORT | 服务端口 | 8090 |
| AMAP_KEY | 高德地图 API Key | - |
| MYSQL_HOST | MySQL 主机地址 | 127.0.0.1 |
| MYSQL_PORT | MySQL 端口 | 3306 |
| MYSQL_USER | MySQL 用户名 | root |
| MYSQL_PASSWORD | MySQL 密码 | - |
| MYSQL_DATABASE | MySQL 数据库名 | smart_metro |

## 访问服务

启动成功后，访问：http://localhost:8090

## 常见问题

### 1. 镜像拉取失败
配置 Docker 镜像加速器后重启 Docker Desktop

### 2. 数据库连接失败
- 如果使用 docker-compose，MySQL 会自动启动
- 如果单独运行容器，确保 MySQL 可访问，或使用 `host.docker.internal` 作为主机地址

### 3. 端口被占用
修改 `docker-compose.yml` 中的端口映射，如 `"8091:8090"`
