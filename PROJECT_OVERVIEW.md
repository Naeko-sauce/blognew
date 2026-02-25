# 项目结构与进度概览 (Project Overview & Progress)

本文档旨在帮助你快速回顾项目的整体结构、已实现的功能以及关键代码的逻辑。

## 1. 项目简介
这是一个基于 **Astro** 框架构建的静态博客网站。
- **核心特性**：极速性能（默认 0 JS）、支持多框架组件（React, Vue）、Markdown 撰写文章。
- **当前状态**：已完成基础博客功能、标签系统、RSS 订阅、移动端适配以及多框架组件集成。

## 2. 当前开发进度 (Current Progress)

| 功能模块 | 状态 | 说明 |
| :--- | :--- | :--- |
| **基础页面** | ✅ 完成 | 首页、关于页、博客列表页均已实现。 |
| **Markdown 博客** | ✅ 完成 | 支持 Markdown 渲染，自动提取 Frontmatter（标题、日期等）。 |
| **布局系统** | ✅ 完成 | 实现了 `BaseLayout`（全局）和 `MarkdownPostLayout`（文章专用）。 |
| **组件集成** | ✅ 完成 | 混用了 Astro (`Footer`, `Social`)、React (`Header`, `Navigation`) 和 Vue (`PageComponents`) 组件。 |
| **动态路由** | ✅ 完成 | 实现了 `/tags/[tag]` 页面，可根据标签筛选文章。 |
| **RSS 订阅** | ✅ 完成 | 实现了 `/rss.xml`，自动生成订阅源。 |
| **移动端适配** | ✅ 完成 | 实现了汉堡菜单 (`Hamburger`)，配合 JS 脚本实现点击展开/收起。 |
| **样式系统** | ✅ 完成 | 使用了 SCSS (`global.scss`, 组件级样式) 和 CSS 变量。 |

## 3. 项目结构详解 (Project Structure)

以下是项目的核心目录结构及其详细说明：

```text
/
├── public/                 # 静态资源目录 (如 favicon.svg, 图片等)
├── src/                    # 源代码目录
│   ├── components/         # UI 组件 (可复用的积木块)
│   │   ├── Footer.astro    # 页脚组件 (Astro) - 包含社交链接
│   │   ├── Header.jsx      # 顶部导航栏 (React) - 包含导航和汉堡菜单
│   │   ├── Navigation.jsx  # 导航链接列表 (React) - 数据驱动渲染
│   │   ├── Hamburger.jsx   # 移动端菜单图标 (React)
│   │   └── Social.astro    # 社交链接组件 (Astro) - 接收 props 生成链接
│   │
│   ├── layouts/            # 页面布局模板 (Layouts)
│   │   ├── BaseLayout.astro      # 全局骨架 (HTML, Head, Body)
│   │   └── MarkdownPostLayout.astro # 文章详情页布局 (处理文章元数据)
│   │
│   ├── pages/              # 页面路由 (文件即路由)
│   │   ├── posts/          # 存放 Markdown 文章 (.md)
│   │   ├── tags/           # 标签功能目录
│   │   │   └── [tag].astro # 动态路由页面，用于生成如 /tags/astro 的页面
│   │   ├── index.astro     # 首页 (/)
│   │   ├── blog.astro      # 博客列表页 (/blog)
│   │   ├── about.astro     # 关于页 (/about)
│   │   └── rss.xml.js      # RSS 生成端点
│   │
│   ├── scripts/            # 客户端脚本
│   │   └── menu.js         # 处理移动端菜单的点击交互逻辑
│   │
│   └── styles/             # 全局样式
│       └── global.scss     # 全局 CSS 样式
│
├── astro.config.mjs        # Astro 配置文件 (配置了 React, Vue 集成)
└── package.json            # 项目依赖管理
```

## 4. 关键技术点说明

### A. 岛屿架构 (Islands Architecture)
Astro 默认不发送 JavaScript 到浏览器。但在本项目中，我们按需引入了交互：
- **静态组件**：`Footer.astro`, `Social.astro` 等默认是静态 HTML。
- **交互组件**：虽然 `Header` 是 React 组件，但默认也是静态渲染的。
- **客户端脚本**：我们在 `menu.js` 中编写了原生 JS 来处理菜单点击，实现了轻量级的交互，避免了加载巨大的 React 库只为了一个菜单开关。

### B. 动态路由 (Dynamic Routing)
在 `src/pages/tags/[tag].astro` 中，我们使用了 `getStaticPaths` 函数。
- **原理**：在构建时（Build time），Astro 会遍历所有的 Markdown 文章，收集所有标签，然后为每一个标签生成一个独立的 HTML 页面。
- **代码逻辑**：
  1. `import.meta.glob` 获取所有文章。
  2. `map` + `flat` + `Set` 提取唯一标签列表。
  3. 返回 `params` (路由参数) 和 `props` (页面数据)。

### C. 混合框架组件 (Framework Mixing)
项目展示了 Astro 强大的兼容性：
- **React**: 用于 `Navigation` 和 `Header`。
- **Vue**: 用于 `PageComponents`。
- **Astro**: 用于布局和页面结构。
它们可以在同一个页面 (`index.astro`) 中并存。

### D. Markdown 集成
- 文章放在 `src/pages/posts/` 或 `src/pages/guides/`。
- Astro 自动解析 Markdown 的 Frontmatter（文件顶部的 `---` 区域）。
- 通过 `MarkdownPostLayout.astro` 布局，我们可以将 Frontmatter 中的 `title`, `pubDate`, `tags` 等信息展示在页面上。

## 5. 下一步建议 (Next Steps)
- **内容填充**：继续在 `src/pages/posts/` 下添加更多 Markdown 文章。
- **样式优化**：可以进一步美化 `global.scss` 或组件样式。
- **功能扩展**：
  - 添加“搜索”功能。
  - 添加“分页”功能（如果文章很多）。
  - 添加“评论”系统（如 Giscus）。
