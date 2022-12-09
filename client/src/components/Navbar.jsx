import { Link } from "react-router-dom";
import logo from "./../assets/logoLong.png"

const Navbar = () => {
  const toggleHandker = () => {
    const nav = document.getElementById("navbar")
    nav.classList.toggle("active")
  }
  return ( 
    <>
      <nav id="navbar">
        <Link to="/"><img src={ logo } alt="TTIC-GIT 2022" className="logo" /></Link>
        <div className="hamburger" onClick={ toggleHandker }>
          <span></span>
        </div>
        <ul className="nav-links">
          <Link to="/watch"><li>Voir les correspondances</li></Link>
          <Link to="/about"><li>A Propos</li></Link>
        </ul>
      </nav>
    </>
   );
}

export default Navbar;