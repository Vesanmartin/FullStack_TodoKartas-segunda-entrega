import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ titulo, descripcion, img, enlace }) {
  return (
    <div className="col-md-6 mb-3">
      <div className="card d-flex flex-row align-items-center">
        <img src={img} className="img-fluid" style={{ width: "150px" }} alt={titulo} />
        <div className="card-body">
          <h5>{titulo}</h5>
          <p>{descripcion}</p>
          <Link to={enlace} className="btn btn-secondary">Leer más</Link>
        </div>
      </div>
    </div>
  );
}
