# Jasa-Chi-Ray 项目博客

为 [Jasa-Chi-Ray/chatgpt-mirror](https://github.com/Jasa-Chi-Ray/chatgpt-mirror) 制作的中文项目介绍与部署指南。纯 HTML、CSS、JavaScript，无构建依赖，可直接托管至 GitHub Pages。

## 本地预览

在此目录运行：

```sh
python -m http.server 8080 --bind 127.0.0.1
```

打开 http://127.0.0.1:8080。也可直接打开 `index.html`；文件协议下剪贴板可能不可用，此时会自动选中代码供手动复制。

## 发布至 GitHub Pages

1. 将静态站点文件（包括 `projects/`、`assets/`、`blog.css`、`styles.css`、`app.js`、`robots.txt`、`sitemap.xml` 和 `.nojekyll`）提交、推送到仓库发布分支。
2. 在 GitHub 仓库 Settings → Pages → Build and deployment，选择 Deploy from a branch。
3. 选择实际发布分支与 `/ (root)`，保存。
4. 等待 GitHub Pages 部署完成，打开仓库 Pages 设置显示的 URL。

此仓库是 `Jasa-Chi-Ray.github.io` 用户站点，默认地址应为 `https://jasa-chi-ray.github.io/`；以 GitHub Pages 实际设置为准。当前工作仅生成静态网站文件，不会自动推送或更改线上站点。

## 页面内容

- 项目功能、技术栈及真实截图切换、大图预览。
- Linux VPS + NGINX HTTPS 部署教程，仅使用原项目三服务 Compose 编排。
- 环境变量、独立随机密钥、Compose 校验与启动、反代 WebSocket、首次登录。
- 数据目录、停机备份、镜像更新、恢复原则及常见问题。
- 代码复制、移动端导航、键盘可操作的标签页、减少动态效果偏好支持。

## 来源与维护

内容核对于 2026-09-16，上游 commit：`6f4c09893c4f15b4c75018b117dc984a3f010f9c`。

- [README](https://github.com/Jasa-Chi-Ray/chatgpt-mirror/blob/6f4c09893c4f15b4c75018b117dc984a3f010f9c/README.md)
- [.env.example](https://github.com/Jasa-Chi-Ray/chatgpt-mirror/blob/6f4c09893c4f15b4c75018b117dc984a3f010f9c/.env.example)
- [docker-compose.yml](https://github.com/Jasa-Chi-Ray/chatgpt-mirror/blob/6f4c09893c4f15b4c75018b117dc984a3f010f9c/docker-compose.yml)
- [管理界面路由](https://github.com/Jasa-Chi-Ray/chatgpt-mirror/blob/6f4c09893c4f15b4c75018b117dc984a3f010f9c/frontend/src/router/index.ts)

NGINX 完整配置、备份流程和本地 HTTP 白名单是根据上游参数编写的部署补充示例，不代表已在真实服务器执行。网站交互验证与镜像服务端到端部署验证是两件事。

`assets/chat-preview.png`、`login-preview.png`、`access-preview.png` 分别来自上游 `imageandvideo/gpt界面1.png`、`登录界面.png`、`禁止访问路径示例.png`，保留原图，版权属于原作者。项目仅供个人学习、研究及获授权的非商业用途，具体以原仓库许可为准。与 OpenAI 官方无隶属关系。

## 文件

`index.html` 管理文字与部署示例；`styles.css` 管理视觉和响应式；`app.js` 管理交互；`assets/` 存放本地图片与图标。所有文本文件使用 UTF-8 无 BOM。

## 多项目目录与设计约定

```text
Jasa-Chi-Ray.github.io/
├── index.html                 # 项目列表，内容直接写在 HTML，支持无 JS 浏览和抓取
├── robots.txt
├── sitemap.xml
├── blog.css                   # 所有页面共享的纯深色、简洁风格
├── styles.css                 # 项目正文基础组件
├── app.js                     # 截图、标签、复制等正文交互
├── assets/
└── projects/
    └── chatgpt-mirror/
        └── index.html
```

后续所有项目使用深色模式，不提供亮色切换。首页只保留项目列表，文章只保留介绍、截图和文档；不要增加装饰标语、虚构数据、自我介绍侧栏或营销卡片。

### 添加项目

1. 新建 `projects/<项目名>/index.html`。以现有文章为模板替换正文；保持共享 CSS，避免引入一套不同的视觉样式。共享 `app.js` 已兼容不包含截图、导航等可选组件的页面。
2. 修改页面 title、description、canonical、面包屑；引用公共资源使用 `../../blog.css`、`../../styles.css`、`../../assets/` 等相对路径。
3. 在首页 `#projects` 内复制 `.post-card`，更新内部链接、图片、标题、摘要与标签。按需要调整顺序；不要添加未完成的虚构项目。
4. 在 `sitemap.xml` 加入该项目的完整 HTTPS URL 与真实更新日期。
5. 从根目录启动预览，检查首页 → 项目 → 返回项目列表，以及手机布局。

### 外链与索引

按要求，页面中的 GitHub 项目/个人外链已经保存在 HTML 注释中，不呈现为可点击链接。正文命令里的仓库地址保留，避免破坏部署教程。首页到项目文章的内部链接保留，以便访问与抓取。

页面提供 `index, follow`、canonical 和站点地图，正文不依赖客户端渲染。注释外链无法保证 Google 收录；发布后须保证公开 URL 正常返回内容，可在 Google Search Console 验证站点并提交 sitemap。若启用自定义域名，同步修改所有 canonical、robots.txt 与 sitemap.xml。

交互统一采用轻量 Material 水波纹点击反馈，支持鼠标、触屏与键盘，尊重减少动态效果偏好；不需要引入 Vue 或 UI 框架。项目部署教程仅保留 VPS，不提供本地体验分支。


## 博客编辑原则

本站是博客，不是产品官网。文章采用连续正文与清楚的教程步骤，不使用营销文案、功能卡片、装饰性侧栏或工作状态标记。页面不写“已核对”“已验证”等作者工作过程说明。安全声明仅在非常重要时出现，避免通用、重复的免责声明；必要的部署参数、故障排查和避免数据丢失的操作说明保留。
