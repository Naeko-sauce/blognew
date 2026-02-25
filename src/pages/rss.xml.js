import rss, { pagesGlobToRssItems } from '@astrojs/rss';

// 这是一个 API 路由（Endpoint）。
// 它会生成一个 rss.xml 文件，通常用于 RSS 订阅。
export async function GET(context) {
  return rss({
    // RSS 订阅源的标题
    title: 'Astro Learner | Blog',
    // 描述
    description: 'My journey learning Astro',
    // 网站地址，从 context 中获取（在 astro.config.mjs 中配置）
    site: context.site,
    // items: 包含所有文章的列表
    // pagesGlobToRssItems 帮助我们将 import.meta.glob 的结果转换为 RSS 项格式
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    // 自定义 XML 数据
    customData: `<language>en-us</language>`,
  });
}