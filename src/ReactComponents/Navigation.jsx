import React from 'react';
import '../styles/global.css';

// 基本的React版本导航组件
// 功能与原始的Navigation.astro保持一致
function Navigation() {
  return (
    <div className="nav-links">
      <a href="/">首页</a>
      <a href="/about/">关于</a>
      <a href="/blog/">博客</a>
      <a href="/tags/">标签</a>
    </div>
  );
}

export default Navigation;