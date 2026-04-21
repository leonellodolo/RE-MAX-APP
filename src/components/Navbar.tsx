import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-brand">RE/MAX</span>
          <span className="logo-sub">BIENES RAÍCES</span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/propiedades"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            Propiedades
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            Contacto
          </NavLink>
        </nav>

        {/* CTA button */}
        <Link to="/propiedades" className="navbar-cta">
          Ver Propiedades
        </Link>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="mobile-menu">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "mobile-link mobile-link--active" : "mobile-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/propiedades"
            className={({ isActive }) =>
              isActive ? "mobile-link mobile-link--active" : "mobile-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            Propiedades
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              isActive ? "mobile-link mobile-link--active" : "mobile-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            Contacto
          </NavLink>
        </nav>
      )}
    </header>
  );
}
