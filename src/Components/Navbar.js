import { useState } from "react";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  const token = localStorage.getItem('token');
const isAdmin = token && localStorage.getItem('is_admin') === '1';


const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    
    window.location.href = "/";
};
  
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ background: "#053F5C", minHeight: "80px" }}>
        <div className="container d-flex justify-content-between align-items-center">
          
         {/* Logo */}
        <Link className="navbar-brand p-0" hidefocus="true" to="/" onClick={closeMenu}>
          <div className="d-flex align-items-center gap-2">
            <img className="logo-img" src="/images/image.png" alt="Logo" />
            <p className="brand-text">ISAG</p>
          </div>
        </Link>

          <button 
            className="d-lg-none bg-transparent border-0 text-white fs-1" 
            type="button"
            onClick={openMenu}
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>

          <div className=" nav-links-container d-none d-lg-flex">
            <ul className="navbar-nav ms-auto gap-4">
           <li className="nav-item">
            <Link to="/" className="nav-link text-white">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link text-white">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/formations" className="nav-link text-white">Formations</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link text-white">Contact</Link>
          </li>

      {isAdmin && (
    <li className="">
      <Link to="/dashboard" className="btn btn-warning  text-dark rounded text-decoration-none">
         Actualites
      </Link>
    </li>
  )}

  {token && (
    <li className="">
      <button onClick={handleLogout} className=" btn btn-danger   rounded text-white text-decoration-none">
        Deconnexion
      </button>
    </li>
  )}
          



          
            </ul>
          </div>
        </div>
      </nav>
    

      

      {/* Side Bar  */}
      <div className={`side-menu ${open ? "active" : ""}`}>
        <div className="text-end p-3">
          <button className="border-0 bg-transparent text-white fs-1" onClick={closeMenu}>
            ✕
          </button>
        </div>
        <ul className="list-unstyled p-4">
          <li className="nav-item mb-4 ">
            <Link to="/" className="menu-link  text-white ">Accueil</Link>
          </li>
          <li className="nav-item mb-4 ">
            <Link to="/about" className=" menu-link text-white ">About</Link>
          </li>
          <li className="nav-item mb-4 ">
            <Link to="/formations" className=" menu-link text-white ">Formations</Link>
          </li>
          <li className="nav-item mb-4">
            <Link to="/contact" className=" menu-link text-white ">Contact</Link>
          </li>

           {isAdmin && (
    <li className="my-3">
      <Link to="/dashboard" className="btn btn-warning  text-dark rounded text-decoration-none">
         Actualites
      </Link>
    </li>
  )}

  {token && (
    <li className="">
      <button onClick={handleLogout} className=" btn btn-danger   rounded text-white text-decoration-none">
        Deconnexion
      </button>
    </li>
  )}
        </ul>
      </div>

      {open && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;