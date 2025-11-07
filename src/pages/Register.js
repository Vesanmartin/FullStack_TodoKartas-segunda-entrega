import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const { register } = useAuth();

  // Se declaran constantes de estado para los campos del formulario y errores
  // Se usa useState porque los valores cambian conforme el usuario escribe
  // Así, se maneja en tiempo real las validaciones.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit=(e)=>{
    e.preventDefault(); setErr("");
    // Validacion de contraseñas coincidentes
    if(pw!==pw2){ setErr("Las contraseñas no coinciden."); return; }
    try{
      //Se llama a la función register del contexto de autenticación
      register({name, email, password:pw});
      // Redirigir al usuario a la página principal tras el registro exitoso
      nav("/");
    }catch(ex){ setErr(ex.message); }
  };

  return (
    <div className="container mt-4" style={{maxWidth:520}}>
      <h2 className="mb-3">Crear cuenta</h2>
      // Mostrar mensaje de error si existe 
      {err && <div className="alert alert-danger py-2">{err}</div>}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          // Incluye validación de campo requerido (no vacío)
          <input className="form-control" value={name} onChange={e=>setName(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          // Incluye validación de campo requerido y formato de email
          <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          // Incluye validación de campo requerido y formato password - no visible - 
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
