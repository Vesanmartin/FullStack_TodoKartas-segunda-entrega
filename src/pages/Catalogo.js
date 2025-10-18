import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../services/products';
import ProductCard from '../components/ProductCard';
import FiltersBar from '../components/FiltersBar';
import { useCart } from '../context/CartContext';

export default function Catalogo(){
  const { add } = useCart();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ q:'', category:'', rarity:'', min:'', max:'', sort:'relevance', pageSize:12 });
  const [page, setPage] = useState(1);

  useEffect(()=>{
    (async()=>{
      setLoading(true);
      const data = await getProducts();
      setAll(data);
      setLoading(false);
    })();
  }, []);

  const apply = useCallback((items)=>{
    let out=[...items];
    if(filters.q){ const q=filters.q.toLowerCase(); out=out.filter(p=>p.name.toLowerCase().includes(q)); }
    if(filters.category) out = out.filter(p=>p.category===filters.category);
    if(filters.rarity)   out = out.filter(p=>p.rarity===filters.rarity);
    const min = filters.min!==''? Number(filters.min): -Infinity;
    const max = filters.max!==''? Number(filters.max):  Infinity;
    out = out.filter(p=>p.price>=min && p.price<=max);
    if(filters.sort==='price_asc')  out.sort((a,b)=>a.price-b.price);
    if(filters.sort==='price_desc') out.sort((a,b)=>b.price-a.price);
    if(filters.sort==='name_asc')   out.sort((a,b)=>a.name.localeCompare(b.name,'es'));
    if(filters.sort==='name_desc')  out.sort((a,b)=>b.name.localeCompare(a.name,'es'));
    return out;
  },[filters]);

  const filtered = useMemo(()=>apply(all), [all, apply]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / filters.pageSize));
  const pageClamp = Math.min(page, totalPages);
  useEffect(()=>{ if(page!==pageClamp) setPage(pageClamp); }, [page, pageClamp]);
  const start = (pageClamp-1)*filters.pageSize;
  const current = filtered.slice(start, start+filters.pageSize);

  if(loading) return <div className="container py-4"><p>Cargando productos…</p></div>;

  return (
    <div className="container my-4">
      <h2 className="mb-3">Catálogo</h2>
      <FiltersBar source={all} onChange={(f)=>{ setFilters(f); setPage(1); }} />

      <div className="row g-3">
        {current.map(p=>(
          <div className="col-12 col-sm-6 col-md-3" key={p.id}>
            <ProductCard producto={p} onAdd={add} onOpenDetail={()=>{}} />
          </div>
        ))}
        {current.length===0 && <p className="text-muted">Sin resultados.</p>}
      </div>

      {totalPages>1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${pageClamp===1?'disabled':''}`}>
              <button className="page-link" onClick={()=>setPage(p=>Math.max(1,p-1))}>Anterior</button>
            </li>
            {Array.from({length: totalPages}).map((_,i)=>(
              <li className={`page-item ${pageClamp===i+1?'active':''}`} key={i}>
                <button className="page-link" onClick={()=>setPage(i+1)}>{i+1}</button>
              </li>
            ))}
            <li className={`page-item ${pageClamp===totalPages?'disabled':''}`}>
              <button className="page-link" onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Siguiente</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
