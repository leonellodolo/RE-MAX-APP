# RE-MAX-APP
# PLATAFORMA DE BIENES RAICES

Una plataforma web moderna de bienes raíces construida con React + TypeScript + Vite.

## 🏠 Características

- **Inicio**: Hero con buscador, estadísticas y propiedades destacadas
- **Propiedades**: Listado completo con filtros por tipo, operación, ubicación, habitaciones y precio
- **Detalle de Propiedad**: Vista completa con descripción, características y contacto del agente
- **Contacto**: Formulario de consulta e información de la oficina

## 🛠️ Tecnologías

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) para bundling ultrarrápido
- [React Router](https://reactrouter.com/) para navegación SPA
- [Lucide React](https://lucide.dev/) para iconos
- CSS puro con variables de diseño (sin frameworks externos)

## 🎨 Diseño

Paleta de colores RE/MAX:
- **Rojo**: `#DC2626`
- **Azul**: `#1E3A8A`
- **Amarillo**: `#FCD34D`

## 🚀 Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📁 Estructura del proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PropertyCard.tsx
│   └── SearchBar.tsx
├── pages/             # Páginas de la aplicación
│   ├── HomePage.tsx
│   ├── PropertiesPage.tsx
│   ├── PropertyDetailPage.tsx
│   └── ContactPage.tsx
├── data/
│   └── properties.ts  # Datos de ejemplo (12 propiedades)
├── types/
│   └── index.ts       # Interfaces TypeScript
├── App.tsx            # Configuración de rutas
└── index.css          # Estilos globales
```
