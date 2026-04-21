export interface Agent {
  name: string;
  phone: string;
  email: string;
}

export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  type: "Casa" | "Departamento" | "Terreno" | "Local Comercial";
  operation: "Venta" | "Alquiler";
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  description: string;
  agent: Agent;
  features: string[];
}

export type PropertyType = Property["type"] | "";
export type OperationType = Property["operation"] | "";
