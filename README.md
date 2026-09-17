# Jasa-Chi-Ray 项目博客



## 搜索引擎设置

- `seo/keywords.json`：120 个去重的品牌、部署、配置、运维及英文搜索词，分为 12 组。文章的 keywords 元标签收录完整词库；Google 不使用该标签决定收录和排名，词库用于后续内容规划。
- 首页和文章包含独立的 title、description、canonical、Open Graph 和 Twitter 摘要；正文自然覆盖主要部署主题。
- JSON-LD：WebSite、Person、CollectionPage、BlogPosting、BreadcrumbList。文章时间与正文日期一致，不添加虚构评分或访问量。
- `sitemap.xml`：Google 支持的标准 XML 格式，列出首页和实际项目文章的 canonical URL。`robots.txt` 引用该文件。
- 网站发布后，在 Google Search Console 添加并验证 `https://jasa-chi-ray.github.io/`，在“站点地图”中提交 `sitemap.xml`。验证需要站点所有者账户；当前没有代为提交。
- 新增文章时更新站点地图和首页列表。只有实质内容修改时才修改该文章 lastmod，不自动为所有文章刷新日期。
- 修改域名时同步更改 canonical、JSON-LD、og:url、图片绝对地址、robots.txt 和 sitemap.xml。

参考：Google 支持的 meta 标签 https://developers.google.com/search/docs/crawling-indexing/special-tags ，XML 站点地图 https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap 。
