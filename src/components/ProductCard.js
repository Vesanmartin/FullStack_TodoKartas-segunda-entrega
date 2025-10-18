import React from "react";

export default function ProductCard({ producto, onAdd, onOpenDetail }) {
  return (
    <div className="card h-100 shadow-sm">
      <img src={producto.img} className="card-img-top object-fit-cover" alt={producto.name} style={{height:200}} />
      <div className="card-body d-flex flex-column">
        <h6 className="fw-600 mb-1">{producto.name}</h6>
        {producto.price!=null && (
          <div className="mb-2 fw-800">${producto.price.toLocaleString("es-CL")}</div>
        )}
        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm" onClick={onOpenDetail}>Detalle</button>
          <button className="btn btn-primary btn-sm" onClick={()=>onAdd(producto)}>Agregar</button>
        </div>
      </div>
    </div>
  );
}
