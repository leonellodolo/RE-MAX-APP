import { useParams, Link } from "react-router-dom";
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Check,
  User,
} from "lucide-react";
import { properties } from "../data/properties";

function formatPrice(price: number, operation: string): string {
  if (operation === "Alquiler") {
    return (
      new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(price) + "/mes"
    );
  }
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="not-found-page">
        <h2>Propiedad no encontrada</h2>
        <p>La propiedad que buscas no existe o fue removida.</p>
        <Link to="/propiedades" className="btn-primary">
          <ArrowLeft size={18} />
          Volver a propiedades
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        {/* Back */}
        <Link to="/propiedades" className="back-link">
          <ArrowLeft size={16} />
          Volver a propiedades
        </Link>

        {/* Image */}
        <div className="detail-image-wrapper">
          <img
            src={property.image}
            alt={property.title}
            className="detail-image"
          />
          <div className="detail-badges">
            <span className="badge badge-type badge--lg">{property.type}</span>
            <span
              className={`badge badge--lg ${
                property.operation === "Venta" ? "badge-venta" : "badge-alquiler"
              }`}
            >
              {property.operation}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="detail-layout">
          <div className="detail-main">
            {/* Title & price */}
            <div className="detail-title-section">
              <h1 className="detail-title">{property.title}</h1>
              <p className="detail-price">
                {formatPrice(property.price, property.operation)}
              </p>
              <p className="detail-location">
                <MapPin size={16} />
                {property.location}
              </p>
            </div>

            {/* Stats */}
            <div className="detail-stats">
              {property.bedrooms > 0 && (
                <div className="detail-stat">
                  <Bed size={24} className="detail-stat-icon" />
                  <span className="detail-stat-value">{property.bedrooms}</span>
                  <span className="detail-stat-label">Habitaciones</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="detail-stat">
                  <Bath size={24} className="detail-stat-icon" />
                  <span className="detail-stat-value">{property.bathrooms}</span>
                  <span className="detail-stat-label">Baños</span>
                </div>
              )}
              <div className="detail-stat">
                <Maximize2 size={24} className="detail-stat-icon" />
                <span className="detail-stat-value">
                  {property.area.toLocaleString()}
                </span>
                <span className="detail-stat-label">m²</span>
              </div>
            </div>

            {/* Description */}
            <div className="detail-description">
              <h2 className="detail-section-title">Descripción</h2>
              <p>{property.description}</p>
            </div>

            {/* Features */}
            <div className="detail-features">
              <h2 className="detail-section-title">Características</h2>
              <ul className="features-list">
                {property.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <Check size={16} className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Agent card */}
          <aside className="detail-sidebar">
            <div className="agent-card">
              <div className="agent-avatar">
                <User size={36} />
              </div>
              <h3 className="agent-name">{property.agent.name}</h3>
              <p className="agent-role">Agente RE/MAX</p>

              <div className="agent-contacts">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="agent-contact-btn"
                >
                  <Phone size={16} />
                  {property.agent.phone}
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="agent-contact-btn agent-contact-btn--email"
                >
                  <Mail size={16} />
                  {property.agent.email}
                </a>
              </div>

              <Link to="/contacto" className="agent-cta">
                Solicitar información
              </Link>
            </div>

            {/* Quick info */}
            <div className="quick-info-card">
              <h4 className="quick-info-title">Información rápida</h4>
              <div className="quick-info-list">
                <div className="quick-info-item">
                  <span className="quick-info-key">Tipo:</span>
                  <span className="quick-info-value">{property.type}</span>
                </div>
                <div className="quick-info-item">
                  <span className="quick-info-key">Operación:</span>
                  <span className="quick-info-value">{property.operation}</span>
                </div>
                <div className="quick-info-item">
                  <span className="quick-info-key">Superficie:</span>
                  <span className="quick-info-value">{property.area} m²</span>
                </div>
                {property.bedrooms > 0 && (
                  <div className="quick-info-item">
                    <span className="quick-info-key">Dormitorios:</span>
                    <span className="quick-info-value">{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="quick-info-item">
                    <span className="quick-info-key">Baños:</span>
                    <span className="quick-info-value">{property.bathrooms}</span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
