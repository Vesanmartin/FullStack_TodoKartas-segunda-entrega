import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ producto, onAdd }) {
  return (
    <div className="card h-100 shadow-sm d-flex flex-column">
      <div
        className="bg-white d-flex align-items-center justify-content-center"
        style={{
          height: "250px",
          overflow: "hidden",
        }}
      >
        <img
          src={producto.img}
          alt={producto.name}
          className="img-fluid"
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h6 className="fw-600 mb-1 text-center">{producto.name}</h6>
        {producto.price != null && (
          <div className="mb-2 fw-800 text-center">
            ${producto.price.toLocaleString("es-CL")} 
          </div> /*coloca el precio y Lo pasa a formato clp */
        )}
        <div className="mt-auto d-flex justify-content-center gap-2">
          <Link className="btn btn-outline-primary btn-sm" to={`/producto/${producto.id}`}>
            Detalle
          </Link>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onAdd(producto)}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

