import React from 'react';
import BaseLayout from '../Layout/BaseLayout.jsx';
import DocumentContentStyle from '../MarkdownStyle/DocumentContentStyle.jsx';

// 这个组件是MarkdownPostLayout.astro的完整React版本替代
// 现在它接收frontmatter作为prop，内容通过children传递
function PostPage({ frontmatter, children }) {
  return (
    <BaseLayout pageTitle={frontmatter.title || '无标题'}>
      <div className="post-layout-container">
        <DocumentContentStyle frontmatter={frontmatter} />
        <div className="post-content">
          {children}
        </div>
      </div>
    </BaseLayout>
  );
}

export default PostPage;