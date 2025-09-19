import React from 'react';
import '../styles/global.css';

// 这个组件用于显示Markdown文章的元信息
// 它接收frontmatter作为prop，包含文章的标题、描述、发布日期、作者、图片和标签等信息
function DocumentContentStyle({ frontmatter }) {
  if (!frontmatter) return null;
  
  return (
    <div className="react-frontmatter-display">
      {/* 只有当description存在时才显示 */}
      {frontmatter.description && (
        <p className="post-description"><em>{frontmatter.description}</em></p>
      )}
      
      {/* 只有当pubDate存在时才显示 */}
      {frontmatter.pubDate && (
        <p className="post-date">发布日期：{(frontmatter.pubDate)}</p>
      )}
      
      {/* 只有当author存在时才显示 */}
      {frontmatter.author && (
        <p className="post-author">作者：{frontmatter.author}</p>
      )}
      
      {/* 只有当image和image.url都存在时才显示图片 */}
      {frontmatter.image && frontmatter.image.url && (
        <img 
          src={frontmatter.image.url} 
          alt={frontmatter.image.alt || '文章图片'} 
          className="post-image"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
      
      {/* 只有当tags存在且不为空数组时才显示标签 */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="post-tags">
          {frontmatter.tags.map((tag, index) => (
            <a key={index} href={`/tags/${tag}`} className="tag">
              {tag}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentContentStyle;