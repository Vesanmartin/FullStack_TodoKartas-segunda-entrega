import React, { useState } from "react";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    telefono: "",
    metodoPago: "Tarjeta Débito",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Compra realizada por ${formData.nombre}!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header">Datos para pagar</div>
        <div className="card-body">
          {["nombre", "correo", "direccion", "telefono"].map((campo) => (
            <div className="mb-3" key={campo}>
              <label className="form-label" htmlFor={campo}>
                {campo.charAt(0).toUpperCase() + campo.slice(1)}
              </label>
              <input
                type="text"
                id={campo}
                className="form-control"
                value={formData[campo]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="mb-3">
            <label htmlFor="metodoPago" className="form-label">
              Método de pago
            </label>
            <select
              id="metodoPago"
              className="form-select"
              value={formData.metodoPago}
              onChange={handleChange}
            >
              <option>Tarjeta Débito</option>
              <option>Tarjeta Crédito</option>
              <option>Transferencia</option>
            </select>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button type="button" className="btn btn-outline-secondary">
            Seguir comprando
          </button>
          <button type="submit" className="btn btn-success">
            Pagar ahora
          </button>
        </div>
      </div>
    </form>
  );
}
