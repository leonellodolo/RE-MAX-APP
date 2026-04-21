import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Share2, Camera, Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-brand">RE/MAX</span>
            <span className="footer-logo-sub">BIENES RAÍCES</span>
          </div>
          <p className="footer-tagline">
            Líderes en bienes raíces. Conectamos personas con sus hogares ideales
            desde hace más de 30 años.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook" className="social-link">
              <Share2 size={18} />
            </a>
            <a href="#" aria-label="Instagram" className="social-link">
              <Camera size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="social-link">
              <Briefcase size={18} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Navegación</h4>
          <ul className="footer-list">
            <li><Link to="/" className="footer-link">Inicio</Link></li>
            <li><Link to="/propiedades" className="footer-link">Propiedades</Link></li>
            <li><Link to="/contacto" className="footer-link">Contacto</Link></li>
          </ul>
        </div>

        {/* Property types */}
        <div className="footer-section">
          <h4 className="footer-heading">Tipo de Propiedad</h4>
          <ul className="footer-list">
            <li><Link to="/propiedades?type=Casa" className="footer-link">Casas</Link></li>
            <li><Link to="/propiedades?type=Departamento" className="footer-link">Departamentos</Link></li>
            <li><Link to="/propiedades?type=Terreno" className="footer-link">Terrenos</Link></li>
            <li><Link to="/propiedades?type=Local+Comercial" className="footer-link">Locales Comerciales</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4 className="footer-heading">Contacto</h4>
          <ul className="footer-list">
            <li className="footer-contact-item">
              <MapPin size={14} />
              <span>Av. Providencia 1234, Santiago</span>
            </li>
            <li className="footer-contact-item">
              <Phone size={14} />
              <span>+56 2 2345 6789</span>
            </li>
            <li className="footer-contact-item">
              <Mail size={14} />
              <span>info@remax.cl</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} RE/MAX Bienes Raíces. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
