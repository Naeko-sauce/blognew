import React from 'react';
import Social from './Social.jsx';

// 这个组件是Footer.astro的React版本
// 它包含了多个Social组件
function Footer() {
  return (
    <footer>
      <Social platform="twitter" username="astrodotbuild" />
      <Social platform="github" username="withastro" />
      <Social platform="youtube" username="astrodotbuild" />
    </footer>
  );
}

export default Footer;