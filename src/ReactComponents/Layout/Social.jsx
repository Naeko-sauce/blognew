import React from 'react';

// 这个组件是Social.astro的React版本
// 它接收platform和username作为props，并生成对应的社交媒体链接
function Social({ platform, username }) {
  return (
    <a href={`https://www.${platform}.com/${username}`} className="social-link">
      {platform}
    </a>
  );
}

export default Social;