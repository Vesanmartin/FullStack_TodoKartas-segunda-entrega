import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';
import { useCart } from '../context/CartContext';
import { obtenerDestacadas } from '../services/productsService';


export default function Home(){
  const { add } = useCart();     //agregar px al carrito desde acá

  /*const all = obtenerCartas();*/
  const [allData, setCartas] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  
  // INICIO CARGA ASINCRONA API TODOKARTAS
  const cargarDestacados = async()=>{
    try{
      setLoading(true);
      const cartas = await obtenerDestacadas();
      setCartas(cartas);
      setError(null);
    } catch (err){
      setError('Error al cargar productos');
      console.error(err);
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    cargarDestacados();
  },[]);


  const destacados = allData || [];
  // FIN CARGA DATOS ASINCRONA API TODOKARTAS 


  return (
    <div className="container my-4">
      <h2 className="mb-3">Productos destacados</h2>
      <div className="row g-3">
        {destacados.map(p=>(
          <div className="col-12 col-sm-6 col-md-4" key={p.id}>
            <ProductCard producto={p} onAdd={add} />
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
            enlace="/blog/minsYboo"
          />
        </div>
        <div className="col-md-6">
          <BlogCard
            titulo="Accesorios y tips"
            descripcion="Los imprescindibles para coleccionistas."
            img="/assets/images/magicBanner.webp"
            enlace="/blog/accesorios"
          />
        </div>
      </div>
    </div>
  );
}
