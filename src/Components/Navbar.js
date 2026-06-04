import { useState, useEffect } from "react";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${savedToken}` },
        });

        setToken(savedToken);
        setIsAdmin(response.data.is_admin === true || response.data.is_admin === 1);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("is_admin");
        setToken(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      try {
        await axios.post(
          "http://localhost:8000/api/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.error("Erreur lors du logout:", error);
      } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("is_admin");
        window.location.href = "/";
      }
    }
  };

  // Boutons pour le menu desktop (inline)
  const AuthButtons = () => {
    if (loading) return null;

    return (
      <>
        {isAdmin && (
          <li>
            <Link
              to="/dashboard"
              className="btn btn-warning text-dark rounded text-decoration-none"
            >
              Actualites
            </Link>
          </li>
        )}
        {token && (
          <li>
            <button
              onClick={handleLogout}
              className="btn btn-danger rounded text-white"
            >
              Déconnexion
            </button>
          </li>
        )}
      </>
    );
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ background: "#053F5C", minHeight: "80px" }}
      >
        <div className="container d-flex justify-content-between align-items-center">

          {/* Logo */}
          <Link className="navbar-brand p-0" to="/" onClick={closeMenu}>
            <div className="d-flex align-items-center gap-2">
              <img className="logo-img" src="/images/image.png" alt="Logo" />
              <p className="brand-text">ISAG</p>
            </div>
          </Link>

          {/* Bouton menu mobile */}
          <button
            className="d-lg-none bg-transparent border-0 text-white fs-1"
            type="button"
            onClick={openMenu}
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>

          {/* Menu desktop */}
          <div className="nav-links-container d-none d-lg-flex">
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
              <AuthButtons />
            </ul>
          </div>
        </div>
      </nav>

      {/* Side Bar mobile */}
      <div className={`side-menu ${open ? "active" : ""}`}>
        <div className="text-end p-3">
          <button
            className="border-0 bg-transparent text-white fs-1"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>
        <ul className="list-unstyled p-4">
          <li className="nav-item mb-4">
            <Link to="/" className="menu-link text-white" onClick={closeMenu}>Accueil</Link>
          </li>
          <li className="nav-item mb-4">
            <Link to="/about" className="menu-link text-white" onClick={closeMenu}>About</Link>
          </li>
          <li className="nav-item mb-4">
            <Link to="/formations" className="menu-link text-white" onClick={closeMenu}>Formations</Link>
          </li>
          <li className="nav-item mb-4">
            <Link to="/contact" className="menu-link text-white" onClick={closeMenu}>Contact</Link>
          </li>

          
          {!loading && isAdmin && (
            <li className="mb-3">
              <Link
                to="/dashboard"
                className="btn btn-warning text-dark rounded text-decoration-none  text-center"
                onClick={closeMenu}
              >
                Actualites
              </Link>
            </li>
          )}

          {!loading && token && (
            <li className="mb-3">
              <button
                onClick={handleLogout}
                className="btn btn-danger rounded text-white "
              >
                Déconnexion
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