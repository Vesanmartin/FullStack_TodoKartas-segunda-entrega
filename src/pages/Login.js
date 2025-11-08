import React, { useState } from "react"; // maneja datos locales
import { useAuth } from "../context/AuthContext";  // manejar autenticacion
import { useNavigate } from "react-router-dom";  // navegar entre paginas dentro de la aplicacion react

export default function Login(){
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = (e)=>{
    e.preventDefault(); setErr("");
    try{
      login({email, password});
      nav("/");
    }catch(ex){ setErr(ex.message); }
  };

  return (
    <div className="container mt-4" style={{maxWidth:480}}>
      <h2 className="mb-3">Iniciar Sesión</h2>
      {err && <div className="alert alert-danger py-2">{err}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={e=>setPw(e.target.value)} required/>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary">Ingresar</button>
          <button type="button" className="btn btn-outline-secondary" onClick={()=>nav("/register")}>
            Registrarme
          </button>
        </div>
      </form>
    </div>
  );
}
