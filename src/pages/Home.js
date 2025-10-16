import React from 'react';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';
import { useCart } from '../context/CartContext';

const destacados = [
  { id:'charizard-gx',  name:'Charizard GX', img:'/assets/images/Charizard_GX.webp', price:9990 },
  { id:'misty-psyduck', name:'Misty & Psyduck', img:'/assets/images/Misty-psyduck 193_182.webp', price:54990 },
  { id:'koraidon',      name:'Koraidon', img:'/assets/images/koraidon1.png', price:12990 },
];

export default function Home(){
  const { add } = useCart();

  return (
    <div className="container my-4">
      <h2 className="mb-3">Productos destacados</h2>
      <div className="row g-3">
        {destacados.map(p=>(
          <div className="col-12 col-sm-6 col-md-4" key={p.id}>
            <ProductCard producto={p} onAdd={add} onOpenDetail={()=>{}} />
          </div>
        ))}
      </div>

      <hr className="my-4"/>

      <h2 className="mb-3">Blogs y noticias</h2>
      <div className="row g-3">
        <div className="col-md-6">
          <BlogCard
            titulo="Entrevista a Mins y Boo"
            descripcion="Secretos del mundo de las cartas con Mins y Boo."
            img="/assets/images/minscYboo1.webp"
            enlace="#"
          />
        </div>
        <div className="col-md-6">
          <BlogCard
            titulo="Accesorios y tips"
            descripcion="Los imprescindibles para coleccionistas."
            img="/assets/images/magicBanner.webp"
            enlace="#"
          />
        </div>
      </div>
    </div>
  );
}
