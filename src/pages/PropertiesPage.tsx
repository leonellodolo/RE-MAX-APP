import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard";
import type { PropertyType, OperationType } from "../types";

export default function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const [filterType, setFilterType] = useState<PropertyType>(
    (searchParams.get("type") as PropertyType) || ""
  );
  const [filterOperation, setFilterOperation] = useState<OperationType>(
    (searchParams.get("operation") as OperationType) || ""
  );
  const [filterLocation, setFilterLocation] = useState(
    searchParams.get("location") || ""
  );
  const [filterBedrooms, setFilterBedrooms] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setFilterType((searchParams.get("type") as PropertyType) || "");
    setFilterOperation((searchParams.get("operation") as OperationType) || "");
    setFilterLocation(searchParams.get("location") || "");
  }, [searchParams]);

  const filtered = properties.filter((p) => {
    if (filterType && p.type !== filterType) return false;
    if (filterOperation && p.operation !== filterOperation) return false;
    if (
      filterLocation &&
      !p.location.toLowerCase().includes(filterLocation.toLowerCase())
    )
      return false;
    if (filterBedrooms && p.bedrooms < parseInt(filterBedrooms)) return false;
    if (filterMaxPrice && p.price > parseFloat(filterMaxPrice)) return false;
    return true;
  });

  function clearFilters() {
    setFilterType("");
    setFilterOperation("");
    setFilterLocation("");
    setFilterBedrooms("");
    setFilterMaxPrice("");
  }

  const hasFilters =
    filterType || filterOperation || filterLocation || filterBedrooms || filterMaxPrice;

  return (
    <div className="properties-page">
      <div className="properties-header">
        <div className="properties-header-content">
          <h1 className="properties-title">Propiedades</h1>
          <p className="properties-count">
            {filtered.length} propiedad{filtered.length !== 1 ? "es" : ""} encontrada
            {filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={18} />
          {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="filters-bar">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Tipo</label>
              <select
                className="filter-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as PropertyType)}
              >
                <option value="">Todos</option>
                <option value="Casa">Casa</option>
                <option value="Departamento">Departamento</option>
                <option value="Terreno">Terreno</option>
                <option value="Local Comercial">Local Comercial</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Operación</label>
              <select
                className="filter-select"
                value={filterOperation}
                onChange={(e) =>
                  setFilterOperation(e.target.value as OperationType)
                }
              >
                <option value="">Todas</option>
                <option value="Venta">Venta</option>
                <option value="Alquiler">Alquiler</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Ubicación</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Ciudad o barrio"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Habitaciones mín.</label>
              <select
                className="filter-select"
                value={filterBedrooms}
                onChange={(e) => setFilterBedrooms(e.target.value)}
              >
                <option value="">Cualquiera</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Precio máximo (USD)</label>
              <input
                type="number"
                className="filter-input"
                placeholder="Ej: 500000"
                value={filterMaxPrice}
                onChange={(e) => setFilterMaxPrice(e.target.value)}
              />
            </div>

            {hasFilters && (
              <div className="filter-group filter-group--clear">
                <button className="clear-filters-btn" onClick={clearFilters}>
                  <X size={14} />
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="properties-grid-page">
        {filtered.length > 0 ? (
          <div className="properties-grid">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No se encontraron propiedades</h3>
            <p>Intenta ajustar los filtros para ver más resultados.</p>
            <button className="btn-primary" onClick={clearFilters}>
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
