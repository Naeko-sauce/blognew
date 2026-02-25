/*
  Hamburger 组件：移动端常见的“汉堡包”菜单图标。
  它本身只有 HTML 结构（三个 span 代表三条线）。
  它的交互逻辑（点击事件）并没有写在 React 组件里，而是写在了 src/scripts/menu.js 中。
  这是因为 Astro 采用了“岛屿架构”，默认发送很少的 JS。
  这里的类名 .hamburger 和 .line 是给 CSS 样式和 external script (menu.js) 钩子用的。
*/
function Hamburger(){
  return(
    <div className="hamburger">
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </div>
  )
}
export default Hamburger;