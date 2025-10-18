import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();
  const nav = useNavigate();
  const [producto, setProducto] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    (async () => {
      const data = await getProductById(id);
      setProducto(data);
    })();
  }, [id]);

  if (!producto) return null;

  return (
    <div className="container py-4">
      <button className="btn btn-link px-0 mb-3" onClick={() => nav(-1)}>
        ← Volver
      </button>

      <div className="row g-4 align-items-center">
        <div className="col-md-6 text-center">
          <div
            className="bg-white d-flex align-items-center justify-content-center rounded"
            style={{ height: 350, overflow: "hidden" }}
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
        </div>

        <div className="col-md-6">
          <h1 className="h4 fw-800 mb-2">{producto.name}</h1>
          <div className="text-muted mb-2">
            {producto.category} · {producto.rarity}
          </div>
          <div className="fs-4 fw-800 mb-3">
            ${producto.price.toLocaleString("es-CL")}
          </div>

          <div className="d-flex align-items-center gap-2 mb-3">
            <label className="form-label mb-0">Cantidad</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
              className="form-control"
              style={{ maxWidth: 120 }}
            />
          </div>

          <button
            className="btn btn-primary me-2"
            onClick={() => add(producto, qty)}
          >
            Agregar al carrito
          </button>
          <button className="btn btn-outline-secondary" onClick={() => nav("/catalogo")}>
            Volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
}
