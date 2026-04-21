import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import type { PropertyType, OperationType } from "../types";

interface SearchBarProps {
  initialType?: PropertyType;
  initialOperation?: OperationType;
  initialLocation?: string;
  onSearch?: (type: PropertyType, operation: OperationType, location: string) => void;
  navigateTo?: boolean;
}

export default function SearchBar({
  initialType = "",
  initialOperation = "",
  initialLocation = "",
  onSearch,
  navigateTo = false,
}: SearchBarProps) {
  const [type, setType] = useState<PropertyType>(initialType);
  const [operation, setOperation] = useState<OperationType>(initialOperation);
  const [location, setLocation] = useState(initialLocation);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSearch) {
      onSearch(type, operation, location);
    }
    if (navigateTo) {
      const params = new URLSearchParams();
      if (type) params.set("type", type);
      if (operation) params.set("operation", operation);
      if (location) params.set("location", location);
      navigate(`/propiedades?${params.toString()}`);
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-fields">
        <select
          className="search-select"
          value={type}
          onChange={(e) => setType(e.target.value as PropertyType)}
        >
          <option value="">Tipo de Propiedad</option>
          <option value="Casa">Casa</option>
          <option value="Departamento">Departamento</option>
          <option value="Terreno">Terreno</option>
          <option value="Local Comercial">Local Comercial</option>
        </select>

        <select
          className="search-select"
          value={operation}
          onChange={(e) => setOperation(e.target.value as OperationType)}
        >
          <option value="">Operación</option>
          <option value="Venta">Venta</option>
          <option value="Alquiler">Alquiler</option>
        </select>

        <input
          type="text"
          className="search-input"
          placeholder="Ubicación (ciudad, barrio...)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <button type="submit" className="search-btn">
        <Search size={18} />
        Buscar
      </button>
    </form>
  );
}
