# inv-multi-lang

受账号密码保护的逆变器多语言说明书门户。包含产品搜索、语言筛选、在线说明书阅读和 HTML 文档下载。

> 当前附带的是界面演示资料。上线使用前，请用经过审核的产品说明书替换 `data/manuals.mjs` 中的示例内容。

## 本地运行

需要 Node.js 20 或更高版本。

```bash
npm start
```

浏览器打开 `http://localhost:4173`。账号与密码在本地 `.env` 文件中配置，该文件不会提交到 Git。

如果要重新生成配置：

```bash
cp .env.example .env
```

然后设置：

```dotenv
PORT=4173
PORTAL_USERNAME=your-admin-username
PORTAL_PASSWORD=use-a-long-unique-password
SESSION_HOURS=8
```

## 安全设计

- 用户名和密码只在服务器环境变量中配置，不发送到前端源码。
- 登录成功后使用 `HttpOnly`、`SameSite=Strict` 会话 Cookie。
- 说明书目录、正文和下载接口均要求有效会话。
- 同一来源连续 5 次登录失败后锁定 5 分钟。
- 设置严格的内容安全策略，并禁止页面被第三方框架嵌入。

前端静态密码门槛无法真正保护资料，因此本项目将目录和正文放在受保护的服务器接口后。若部署到 GitHub Pages，只能发布前端界面，不能获得同等安全性。推荐部署到支持 Node.js 的环境，例如 Render、Railway、Fly.io 或自有服务器，并配置 HTTPS 和环境变量。

仓库包含 `Dockerfile`，也可部署到任何支持容器和 HTTPS 的平台。部署时必须通过平台的环境变量设置 `PORTAL_USERNAME` 和 `PORTAL_PASSWORD`，并将 `NODE_ENV` 设为 `production`。

## 添加正式说明书

1. 编辑 `data/manuals.mjs`，添加产品、语言与章节。
2. 在 `languageMeta` 中增加语言（同时更新服务器里的语言路由正则）。
3. 如改为上传 PDF，请将文件存放在非公开目录，并通过已验证会话的下载接口返回。

## 检查

```bash
npm run check
```
