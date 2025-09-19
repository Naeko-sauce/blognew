import React from 'react';
import '../styles/global.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

// 这个组件是BaseLayout.astro的React版本
// 它接收pageTitle作为prop，并使用children来显示子内容
function BaseLayout({ pageTitle, children }) {
  return (
    <div className="base-layout">
      <Header />
      <main>
        <h1>{pageTitle}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default BaseLayout;