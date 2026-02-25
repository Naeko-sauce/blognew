import Hamburger from './Hamburger.jsx';
import Navigation from './Navigation.jsx';

/*
  Header 组件：页面的顶部导航栏。
  这是一个 React 组件 (.jsx)。
  它组合了 Hamburger（汉堡菜单图标）和 Navigation（导航链接列表）两个组件。
*/
function Header(){
  return(
    <header>
      <nav>
        {/* 
           Hamburger 组件：在移动端显示的三条线图标。
           点击它会触发 scripts/menu.js 中的逻辑，展开/收起 Navigation。
        */}
        <Hamburger />
        {/* Navigation 组件：包含具体的导航链接（首页、关于、博客等） */}
        <Navigation />
      </nav>
    </header>
  )
}
export default Header;
