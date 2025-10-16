import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit=(e)=>{
    e.preventDefault(); setErr("");
    if(pw!==pw2){ setErr("Las contraseñas no coinciden."); return; }
    try{
      register({name, email, password:pw});
      nav("/");
    }catch(ex){ setErr(ex.message); }
  };

  return (
    <div className="container mt-4" style={{maxWidth:520}}>
      <h2 className="mb-3">Crear cuenta</h2>
      {err && <div className="alert alert-danger py-2">{err}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={name} onChange={e=>setName(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={pw} onChange={e=>setPw(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Repite contraseña</label>
          <input type="password" className="form-control" value={pw2} onChange={e=>setPw2(e.target.value)} required/>
        </div>
        <button className="btn btn-primary">Crear cuenta</button>
      </form>
    </div>
  );
}
