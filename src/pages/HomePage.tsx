import { Link } from "react-router-dom";
import { ArrowRight, Home, TrendingUp, Award } from "lucide-react";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  const featured = properties.slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">RE/MAX Bienes Raíces</span>
          <h1 className="hero-title">
            Encuentra tu<br />
            <span className="hero-title-highlight">Propiedad Ideal</span>
          </h1>
          <p className="hero-subtitle">
            Más de 12.000 propiedades disponibles. Casas, departamentos,
            terrenos y locales comerciales en venta y alquiler.
          </p>
          <SearchBar navigateTo />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <Home size={32} className="stat-icon" />
            <span className="stat-number">12,000+</span>
            <span className="stat-label">Propiedades</span>
          </div>
          <div className="stat-item">
            <TrendingUp size={32} className="stat-icon" />
            <span className="stat-number">5,000+</span>
            <span className="stat-label">Clientes felices</span>
          </div>
          <div className="stat-item">
            <Award size={32} className="stat-icon" />
            <span className="stat-number">30+</span>
            <span className="stat-label">Años de experiencia</span>
          </div>
          <div className="stat-item">
            <Home size={32} className="stat-icon" />
            <span className="stat-number">200+</span>
            <span className="stat-label">Agentes activos</span>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Propiedades Destacadas</h2>
            <p className="section-subtitle">
              Descubre nuestra selección de propiedades más exclusivas
            </p>
          </div>

          <div className="properties-grid">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="section-cta">
            <Link to="/propiedades" className="btn-primary">
              Ver todas las propiedades
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para encontrar tu próxima propiedad?</h2>
            <p className="cta-text">
              Nuestros agentes expertos están listos para ayudarte a encontrar
              la propiedad perfecta según tus necesidades y presupuesto.
            </p>
            <div className="cta-actions">
              <Link to="/propiedades" className="btn-cta-primary">
                Explorar propiedades
              </Link>
              <Link to="/contacto" className="btn-cta-secondary">
                Hablar con un agente
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
