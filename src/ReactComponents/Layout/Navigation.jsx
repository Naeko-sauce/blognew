import React from 'react';
import '../styles/global.css';

// 这个组件是Navigation.astro的React版本
// 它包含了网站的主要导航链接
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