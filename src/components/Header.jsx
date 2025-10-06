import Hamburger from './Hamburger.jsx';
import Navigation from './Navigation.jsx';

function Header(){
  return(
    <header>
      <nav>
        <Hamburger />
        <Navigation />
      </nav>
    </header>
  )
}
export default Header;
