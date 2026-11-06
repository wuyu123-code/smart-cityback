# 多阶段构建 - 构建阶段
FROM node:20-bookworm AS builder

WORKDIR /app

# 安装构建依赖
COPY package*.json ./
RUN npm ci

COPY . .

# 构建 NestJS 应用
RUN npm run build

# 生产阶段
FROM node:20-bookworm AS production

WORKDIR /app

# 设置 Node.js 生产环境
ENV NODE_ENV=production

# 只复制必要的文件
COPY package*.json ./
RUN npm ci --only=production

# 从构建阶段复制构建好的文件
COPY --from=builder /app/dist ./dist

# 暴露端口（从环境变量读取，默认 8092）
EXPOSE 8092

# 启动应用
CMD ["node", "dist/main"]
