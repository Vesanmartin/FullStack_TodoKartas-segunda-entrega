// src/components/CheckoutForm.js
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    direccion: "",
    telefono: "",
    metodoPago: "Tarjeta Débito",
  });

  const { cart, total, add, sub, remove } = useCart();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Compra realizada por ${formData.nombre} por $${total.toLocaleString("es-CL")}`
    );

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex gap-4 flex-wrap">
        {/* Datos del comprador (izquierda) */}
        <div className="card flex-grow-1">
          <div className="card-header">Datos para pagar</div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label fw-600">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                className="form-control"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label fw-600">
                Correo
              </label>
              <input
                id="correo"
                type="email"
                className="form-control"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="direccion" className="form-label fw-600">
                Dirección
              </label>
              <input
                id="direccion"
                type="text"
                className="form-control"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label fw-600">
                Teléfono
              </label>
              <input
                id="telefono"
                type="tel"
                className="form-control"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="metodoPago" className="form-label fw-600">
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
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => nav("/catalogo")}
            >
              Seguir comprando
            </button>
            <button type="submit" className="btn btn-success">
              Pagar ahora
            </button>
          </div>
        </div>

        {/* Detalle del pedido (derecha) */}
        <div className="card" style={{ minWidth: "320px" }}>
          <div className="card-header">Detalle del pedido</div>
          <div className="card-body">
            {cart.length === 0 ? (
              <p className="text-muted">No hay productos en el carrito.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-start flex-column"
                  >
                    <div className="fw-600 mb-1">
                      {item.name} x {item.qty}
                    </div>

                    <div className="d-flex align-items-center gap-2 w-100">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary qty-btn"
                        onClick={() => sub(item.id)}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary qty-btn"
                        onClick={() => add(item, 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => remove(item.id)}
                      >
                        Quitar
                      </button>

                      <span className="ms-auto fw-600">
                        ${ (item.price * item.qty).toLocaleString("es-CL") }
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-footer text-end fw-bold">
            Total: ${total.toLocaleString("es-CL")}
          </div>
        </div>
      </div>
    </form>
  );
}
