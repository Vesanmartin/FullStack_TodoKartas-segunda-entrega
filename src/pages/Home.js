import React from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";

const productos = [
  { id: 1, nombre: "Charizard GX", img: "/assets/images/Charizard_GX.webp" },
  { id: 2, nombre: "Misty & Psyduck", img: "/assets/images/Misty-psyduck 193_182.webp" },
  { id: 3, nombre: "Koraidon", img: "/assets/images/koraidon1.png" },
];

 function Home() {
  return (
    <>
      <Banner />
      <Navbar />
      <div className="container my-4">
        <h2>Productos</h2>
        <div className="row">
          {productos.map((p) => (
            <div className="col-md-4 mb-3" key={p.id}>
              <ProductCard producto={p} />
            </div>
          ))}
        </div>
      </div>

      <div className="container my-4">
        <h2>Blogs</h2>
        <div className="row">
          <BlogCard
            titulo="Entrevista a Mins y Boo"
            descripcion="Descubre los secretos de Mins y Boo en el mundo de las cartas."
            img="/assets/images/minscYboo1.webp"
            enlace="/blog1"
          />
          <BlogCard
            titulo="Accesorios y tips"
            descripcion="Explora los mejores accesorios para coleccionistas."
            img="/assets/images/magicBanner.webp"
            enlace="/blog2"
          />
        </div>
      </div>
    </>
  );
}

export default Home;