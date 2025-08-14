# Docker 部署说明

## 项目简介
这是一个基于Koa.js的新闻聚合应用，支持多个新闻源的数据获取。

## Docker 部署方式

### 方式一：使用 Docker Compose（推荐）

1. **构建并启动服务**
   ```bash
   docker-compose up -d
   ```

2. **查看服务状态**
   ```bash
   docker-compose ps
   ```

3. **查看日志**
   ```bash
   docker-compose logs -f terminal-news
   ```

4. **停止服务**
   ```bash
   docker-compose down
   ```

### 方式二：使用 Docker 命令

1. **构建镜像**
   ```bash
   docker build -t terminal-news .
   ```

2. **运行容器**
   ```bash
   docker run -d -p 8090:8090 --name terminal-news-app terminal-news
   ```

3. **查看容器状态**
   ```bash
   docker ps
   ```

4. **查看容器日志**
   ```bash
   docker logs -f terminal-news-app
   ```

5. **停止并删除容器**
   ```bash
   docker stop terminal-news-app
   docker rm terminal-news-app
   ```

## 访问应用
应用启动后，可以通过以下地址访问：
- 本地访问：http://localhost:8090
- 网络访问：http://your-server-ip:8090

## 注意事项
- 确保8090端口未被占用
- 首次启动可能需要一些时间来安装依赖
- 如果需要修改配置，请重新构建镜像

## 故障排除
如果遇到问题，可以：
1. 检查Docker服务是否正常运行
2. 查看容器日志获取错误信息
3. 确认端口映射是否正确
4. 检查网络配置 