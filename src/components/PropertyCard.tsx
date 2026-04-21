import { Link } from "react-router-dom";
import { Bed, Bath, Maximize2, MapPin } from "lucide-react";
import type { Property } from "../types";

interface PropertyCardProps {
  property: Property;
}

function formatPrice(price: number, operation: string): string {
  if (operation === "Alquiler") {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price) + "/mes";
  }
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="property-card">
      <div className="card-image-wrapper">
        <img
          src={property.image}
          alt={property.title}
          className="card-image"
          loading="lazy"
        />
        <div className="card-badges">
          <span className="badge badge-type">{property.type}</span>
          <span
            className={`badge ${
              property.operation === "Venta" ? "badge-venta" : "badge-alquiler"
            }`}
          >
            {property.operation}
          </span>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{property.title}</h3>
        <p className="card-price">{formatPrice(property.price, property.operation)}</p>

        <p className="card-location">
          <MapPin size={14} />
          {property.location}
        </p>

        <div className="card-stats">
          {property.bedrooms > 0 && (
            <span className="card-stat">
              <Bed size={14} />
              {property.bedrooms} hab.
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="card-stat">
              <Bath size={14} />
              {property.bathrooms} baños
            </span>
          )}
          <span className="card-stat">
            <Maximize2 size={14} />
            {property.area.toLocaleString()} m²
          </span>
        </div>

        <Link to={`/propiedades/${property.id}`} className="card-btn">
          Ver Detalles
        </Link>
      </div>
    </article>
  );
}
