// 客户端脚本
// 这段代码在浏览器中运行。
// 它监听 .hamburger 元素的点击事件。
// 当点击时，它会切换 .nav-links 元素的 .expanded 类。
// .expanded 类在 CSS 中定义了导航菜单的显示样式（比如从隐藏变为显示）。
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('expanded');
});