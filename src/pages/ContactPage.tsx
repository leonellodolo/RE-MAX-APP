import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <div className="contact-header-content">
          <h1 className="contact-title">Contáctanos</h1>
          <p className="contact-subtitle">
            Nuestro equipo de expertos está listo para ayudarte a encontrar tu
            propiedad ideal o resolver cualquier consulta.
          </p>
        </div>
      </div>

      <div className="contact-container">
        {/* Form */}
        <div className="contact-form-wrapper">
          <h2 className="contact-form-title">Envíanos un mensaje</h2>

          {submitted ? (
            <div className="success-message">
              <CheckCircle size={48} className="success-icon" />
              <h3>¡Mensaje enviado!</h3>
              <p>
                Gracias por contactarnos. Un agente se comunicará contigo dentro
                de las próximas 24 horas hábiles.
              </p>
              <button
                className="btn-primary"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    interest: "",
                    message: "",
                  });
                }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Nombre completo *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Tu nombre completo"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    placeholder="+56 9 XXXX XXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="interest" className="form-label">
                    ¿Qué te interesa?
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className="form-select"
                    value={form.interest}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="comprar">Comprar una propiedad</option>
                    <option value="arrendar">Arrendar una propiedad</option>
                    <option value="vender">Vender mi propiedad</option>
                    <option value="invertir">Invertir en bienes raíces</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="form-submit">
                Enviar mensaje
              </button>
            </form>
          )}
        </div>

        {/* Office info */}
        <div className="office-info">
          <h2 className="office-title">Oficina Central</h2>

          <div className="office-details">
            <div className="office-item">
              <div className="office-icon-wrapper">
                <MapPin size={20} />
              </div>
              <div>
                <h4>Dirección</h4>
                <p>Av. Providencia 1234, Piso 8</p>
                <p>Providencia, Santiago, Chile</p>
              </div>
            </div>

            <div className="office-item">
              <div className="office-icon-wrapper">
                <Phone size={20} />
              </div>
              <div>
                <h4>Teléfono</h4>
                <p>+56 2 2345 6789</p>
                <p>+56 9 8765 4321</p>
              </div>
            </div>

            <div className="office-item">
              <div className="office-icon-wrapper">
                <Mail size={20} />
              </div>
              <div>
                <h4>Correo</h4>
                <p>info@remax.cl</p>
                <p>ventas@remax.cl</p>
              </div>
            </div>

            <div className="office-item">
              <div className="office-icon-wrapper">
                <Clock size={20} />
              </div>
              <div>
                <h4>Horario</h4>
                <p>Lunes a Viernes: 9:00 – 18:00</p>
                <p>Sábado: 10:00 – 14:00</p>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="map-placeholder">
            <MapPin size={32} />
            <p>Av. Providencia 1234, Santiago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
