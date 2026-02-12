# 奇思妙想

## 一键部署到 EdgeOne

国际站

[![使用 EdgeOne Pages 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository-url=https://github.com/dushixiang/ideas)

国内站

[![使用 EdgeOne Pages 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?repository-url=https://github.com/dushixiang/ideas)

## Nginx 部署教程

1. 构建与上传
   - 将本仓库部署到服务器任意目录，比如 `/var/www/ideas`
   - 目录内应包含 `index.html`、`apps/`、`games/` 等静态文件

2. 配置 Nginx
   - 新建配置文件（示例：`/etc/nginx/conf.d/ideas.conf`）
   - 参考配置如下（按需调整域名与路径）：

```nginx
server {
  listen 80;
  server_name ideas.example.com;

  root /var/www/ideas;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # 静态资源缓存（可选）
  location ~* \.(css|js|png|jpg|jpeg|gif|svg|ico|webp|mp4|woff2?)$ {
    expires 30d;
    add_header Cache-Control "public";
  }
}
```

3. 检查与重载
   - `nginx -t`
   - `systemctl reload nginx`
