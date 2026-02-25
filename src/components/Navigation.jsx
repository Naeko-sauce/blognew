import '../styles/ReactComponentStyle/Navigation.scss'

// 导航链接数据
// 将数据和 UI 分离，方便管理。如果以后要加新页面，只需要在这个数组里加一项，不用去改下面的 JSX 结构。
const navLinks = [
  { id: 'home', label: '首页',path:'/'},
  { id: 'about', label: '关于',path:'/about/'},
  { id: 'blog', label: '博客',path:'/blog/'},
  { id: 'tags', label: '标签',path:'/tags/'},
]

function Navigation(){
  return (
    /* 
      .nav-links 类名对应 CSS 中的样式，用于控制导航菜单的显示和隐藏（特别是在移动端）。
      这个类名会被 scripts/menu.js 中的脚本操作，切换 .expanded 类来实现展开/收起效果。
    */
    <div className="nav-links">
     {
      /* 
        使用 map 方法遍历 navLinks 数组，动态生成 <a> 标签。
        key={i.id} 是 React 列表渲染必须的，用于优化渲染性能。
      */
      navLinks.map(i =>(
        <a href={i.path} key={i.id}>
          {i.label}
        </a>
      ))
     }
    </div>
  );
}
export default Navigation;
