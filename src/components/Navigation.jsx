import '../styles/ReactComponentStyle/Navigation.scss'

const navLinks = [
  { id: 'home', label: '首页',path:'/'},
  { id: 'home', label: '关于',path:'/about/'},
  { id: 'home', label: '博客',path:'/blog/'},
   { id: 'home', label: '博客',path:'/tags/'},
]

function Navigation(){
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
