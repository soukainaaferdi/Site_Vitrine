import { useState } from "react";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ background: "#053F5C" }}>
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand text-white fw-bold d-flex" to="/" onClick={closeMenu}>
            <h4 style={{ color: "#F7AD19", margin: 0 }}>IS</h4>
            <h4 style={{ color: "white", margin: 0 }}>AG</h4>
          </Link>

          {/* Hamburger Button for Mobile */}
          <button 
            className="navbar-toggler text-white border-0 fs-2 d-lg-none" 
            onClick={openMenu}
          >
            ☰
          </button>

          {/* Desktop Links (Visible only on Large screens) */}
          <div className="collapse navbar-collapse d-none d-lg-block">
            <ul className="navbar-nav ms-auto d-flex align-items-center gap-4">
              <li className="nav-item">
                <HashLink smooth to="/#home" className="nav-link text-white">Accueil</HashLink>
              </li>
              <li className="nav-item">
                <HashLink smooth to="/#about" className="nav-link text-white">About</HashLink>
              </li>
              <li className="nav-item">
                <HashLink smooth to="/#formations" className="nav-link text-white">Formations</HashLink>
              </li>
              <li className="nav-item">
                <HashLink smooth to="/#contact" className="nav-link text-white">Contact</HashLink>
              </li>
              <li className="nav-item">
                <Link to="/actualites" className="nav-link text-white">Actualités</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Side Bar (Mobile) */}
      <div className={`side-menu ${open ? "active" : ""}`}>
        <div className="text-end p-3">
          <button className="border-0 bg-transparent text-white fs-2" onClick={closeMenu}>
            ✕
          </button>
        </div>
        <ul className="list-unstyled p-4">
          <li className="mb-3">
            <HashLink smooth to="/#home" className="menu-link" onClick={closeMenu}>Accueil</HashLink>
          </li>
          <li className="mb-3">
            <HashLink smooth to="/#about" className="menu-link" onClick={closeMenu}>About</HashLink>
          </li>
          <li className="mb-3">
            <HashLink smooth to="/#formations" className="menu-link" onClick={closeMenu}>Formations</HashLink>
          </li>
          <li className="mb-3">
            <HashLink smooth to="/#contact" className="menu-link" onClick={closeMenu}>Contact</HashLink>
          </li>
          <li className="mb-3">
            <Link to="/actualites" className="menu-link" onClick={closeMenu}>Actualités</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;