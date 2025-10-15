import React from "react";

export default function ProductCard({ producto }) {
  return (
    <div className="card">
      <img src={producto.img} className="card-img-top" alt={producto.nombre} />
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <button className="btn btn-info">Detalle Producto</button>
      </div>
    </div>
  );
}
