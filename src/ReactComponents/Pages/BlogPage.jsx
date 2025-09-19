import React from 'react';
import BaseLayout from '../Layout/BaseLayout.jsx';

// 这个组件是blog.astro的完整React版本替代
// 注意：在纯React组件中，我们不能直接使用import.meta.glob
// 所以这里需要从外部接收posts数据
function BlogPage({ posts }) {
  const pageTitle = "我的 Astro 学习博客";
  
  return (
    <BaseLayout pageTitle={pageTitle}>
      <div className="blog-page-content">
        <p>在这里，我将分享我的 Astro 学习之旅。</p>
        <ul className="blog-posts-list">
          {posts && posts.map((post) => (
            <React.Fragment key={post.url}>
              <li>
                <a href={post.url} className="post-title-link">
                  {post.frontmatter.title} 
                  {post.frontmatter.pubDate && (
                    <span className="post-date">
                      {post.frontmatter.pubDate.toString().substring(0, 10)}
                    </span>
                  )}
                </a>
              </li>
              {post.frontmatter.description && (
                <li>
                  <a href={post.url} className="post-description-link">
                    {post.frontmatter.description}
                  </a>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
}

export default BlogPage;