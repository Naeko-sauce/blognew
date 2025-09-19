import React from 'react';
import Navigation from './Navigation.jsx';
import Hamburger from './Hamburger.jsx';

// 这个组件是Header.astro的React版本
// 它包含了Hamburger和Navigation组件
function Header() {
  return (
    <header>
      <nav>
        <Hamburger />
        <Navigation />
      </nav>
    </header>
  );
}

export default Header;