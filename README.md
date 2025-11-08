# 英灵殿 (Valhalla)

这是一个基于 Next.js 构建的纪念网站，用于纪念对社团做出贡献的重要人物。

## 技术栈

- [Next.js 16](https://nextjs.org)
- [Prisma](https://prisma.io/) ORM
- [PostgreSQL](https://www.postgresql.org/) 数据库
- TailwindCSS 样式

## 开始开发

首先，安装依赖并设置环境变量：

```bash
npm install
```

复制 [.env.example](./.env.example) 文件创建一个 `.env` 文件，并填入必要的环境变量：

```bash
cp .env.example .env
```

然后运行开发服务器：

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 环境变量

部署时需要配置以下环境变量：

### 数据库相关

- `DATABASE_URL` - PostgreSQL 数据库连接字符串，格式为 `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`

### OAuth2 认证相关

- `NEXT_PUBLIC_OAUTH_CLIENT_ID` - OAuth2 客户端 ID
- `NEXT_PUBLIC_OAUTH_REDIRECT_URI` - OAuth2 重定向 URI (例如: https://yourdomain.com/api/auth/callback)
- `NEXT_PUBLIC_OAUTH_AUTHORIZATION_ENDPOINT` - OAuth2 授权端点
- `NEXT_PUBLIC_OAUTH_TOKEN_ENDPOINT` - OAuth2 令牌端点
- `NEXT_PUBLIC_OAUTH_USER_INFO_ENDPOINT` - 用户信息端点
- `NEXT_PUBLIC_OAUTH_CLIENT_SECRET` - OAuth2 客户端密钥

## 数据库设置

1. 设置好 `DATABASE_URL` 环境变量
2. 运行数据库迁移：

```bash
npm run db:migrate
```

3. （可选）填充初始数据：

```bash
npm run db:seed
```

## 部署

最简单的部署方式是使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)，这是 Next.js 的创建者提供的平台。

确保在部署平台上设置了所有必需的环境变量。

有关 Next.js 部署的更多详细信息，请查看我们的 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying)。
