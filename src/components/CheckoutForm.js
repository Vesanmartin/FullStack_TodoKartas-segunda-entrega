import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutForm() {
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
    alert(`Compra realizada por ${formData.nombre} por $${total.toLocaleString("es-CL")}`);
  };

  return React.createElement("form", { onSubmit: handleSubmit }, [
    React.createElement("div", { className: "d-flex gap-4 flex-wrap", key: "layout" }, [
      // Datos del comprador (izquierda)
      React.createElement("div", { className: "card flex-grow-1", key: "formulario" }, [
        React.createElement("div", { className: "card-header" }, "Datos para pagar"),
        React.createElement("div", { className: "card-body" }, [
          ...["nombre", "correo", "direccion", "telefono"].map((campo) =>
            React.createElement("div", { className: "mb-3", key: campo }, [
              React.createElement("label", { className: "form-label fw-600", htmlFor: campo }, campo.charAt(0).toUpperCase() + campo.slice(1)),
              React.createElement("input", {
                type: "text",
                id: campo,
                className: "form-control",
                value: formData[campo],
                onChange: handleChange,
              }),
            ])
          ),
          React.createElement("div", { className: "mb-3" }, [
            React.createElement("label", { htmlFor: "metodoPago", className: "form-label fw-600" }, "Método de pago"),
            React.createElement("select", {
              id: "metodoPago",
              className: "form-select",
              value: formData.metodoPago,
              onChange: handleChange,
            }, [
              React.createElement("option", {}, "Tarjeta Débito"),
              React.createElement("option", {}, "Tarjeta Crédito"),
              React.createElement("option", {}, "Transferencia"),
            ]),
          ]),
        ]),
        React.createElement("div", { className: "card-footer d-flex gap-2" }, [
          React.createElement("button", { type: "button", className: "btn btn-outline-secondary" }, "Seguir comprando"),
          React.createElement("button", { type: "submit", className: "btn btn-success" }, "Pagar ahora"),
        ]),
      ]),

      // Detalle del pedido (derecha)
      React.createElement("div", { className: "card", style: { minWidth: "320px" }, key: "resumen" }, [
        React.createElement("div", { className: "card-header" }, "Detalle del pedido"),
        React.createElement("div", { className: "card-body" }, [
          cart.length === 0
            ? React.createElement("p", { className: "text-muted" }, "No hay productos en el carrito.")
            : React.createElement("ul", { className: "list-group" },
                cart.map((item) =>
                  React.createElement("li", {
                    key: item.id,
                    className: "list-group-item d-flex justify-content-between align-items-start flex-column",
                  }, [
                    React.createElement("div", { className: "fw-600 mb-1" }, `${item.name} x ${item.qty}`),
                    React.createElement("div", { className: "d-flex gap-2" }, [
                      React.createElement("button", {
                        type: "button",
                        className: "btn btn-sm btn-outline-secondary qty-btn",
                        onClick: () => sub(item.id),
                      }, "-"),
                      React.createElement("button", {
                        type: "button",
                        className: "btn btn-sm btn-outline-secondary qty-btn",
                        onClick: () => add(item, 1),
                      }, "+"),
                      React.createElement("button", {
                        type: "button",
                        className: "btn btn-sm btn-outline-danger",
                        onClick: () => remove(item.id),
                      }, "Quitar"),
                      React.createElement("span", { className: "ms-auto fw-600" }, `$${(item.price * item.qty).toLocaleString("es-CL")}`),
                    ]),
                  ])
                )
              ),
        ]),
        React.createElement("div", { className: "card-footer text-end fw-bold" }, `Total: $${total.toLocaleString("es-CL")}`),
      ]),
    ]),
  ]);
}