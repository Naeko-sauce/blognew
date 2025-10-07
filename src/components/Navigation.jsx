import '../styles/ReactComponentStyle/Navigation.scss'

const navLinks = [
  { id: 'home', label: '首页',path:'/'},
  { id: 'home', label: '关于',path:'/about/'},
  { id: 'home', label: '博客',path:'/blog/'},
   { id: 'home', label: '标签',path:'/tags/'},
]

function Navigation(){
  return (
    <div className="nav-links">
     {
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
