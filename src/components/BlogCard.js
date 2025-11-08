import React from "react";
import { Link } from "react-router-dom";

//este componente BlogCard nos permite mostrar cada publicación o noticia de forma ordenada

export default function BlogCard({ titulo, descripcion, img, enlace }) {
  return (
    <div className="card mb-3">
      <div className="row g-0 align-items-center">
        <div className="col-12 col-md-4">
          <img src={img} className="img-fluid rounded-start" alt={titulo} />
        </div>
        <div className="col-12 col-md-8">
          <div className="card-body">
            <h5 className="card-title">{titulo}</h5>
            <p className="card-text">{descripcion}</p>
            <Link to={enlace} className="btn btn-secondary">
              Leer más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}