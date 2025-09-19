import React from 'react';
import '../styles/global.css';

// 这个组件是Hamburger.astro的React版本
// 它是一个简单的汉堡菜单图标组件
function Hamburger() {
  return (
    <div className="hamburger">
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </div>
  );
}

export default Hamburger;