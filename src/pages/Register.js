import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

// Este componente muestra el formulario de registro.
// Permite que un usuario nuevo cree su cuenta y quede guardado en MongoDB.
export default function Register() {

  // Obtenemos la función register del AuthContext.
  // Esta función es la que realmente llama al backend.
  const { register } = useAuth();

  // Estados para guardar lo que el usuario escribe en el formulario.
  const [name, setName] = useState("");   // nombre del usuario
  const [email, setEmail] = useState(""); // correo del usuario
  const [pw, setPw] = useState("");       // contraseña
  const [pw2, setPw2] = useState("");     // repetir contraseña
  const [err, setErr] = useState("");     // para mostrar mensajes de error

  // useNavigate permite redirigir a otra página después de registrarse.
  const nav = useNavigate();

  // Esta función se ejecuta cuando el usuario hace clic en "Crear cuenta".
  const submit = async (e) => {
    e.preventDefault();  
    setErr("");          

    // Validamos que ambas contraseñas sean iguales.
    if (pw !== pw2) {
      setErr("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Llamamos a register, que enviará los datos al backend.
      // Con esto se crea el usuario en MongoDB.
      await register({ nombre: name, email, password: pw });

      // Si todo sale bien, enviamos al usuario al Home.
      nav("/");

    } catch (ex) {
      // Si ocurre un error, lo mostramos debajo del título.
      setErr(ex.message);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 520 }}>
      <h2 className="mb-3">Crear cuenta</h2>

      {/* Si existe un error, lo mostramos en pantalla */}
      {err && <div className="alert alert-danger">{err}</div>}

      {/* Formulario de registro */}
      <form onSubmit={submit}>
        
        {/* Campo para escribir el nombre */}
        <div className="mb-3">
          <label>Nombre</label>
          <input 
            className="form-control" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required
          />
        </div>

        {/* Campo para escribir el correo */}
        <div className="mb-3">
          <label>Correo</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required
          />
        </div>

        {/* Campo de contraseña */}
        <div className="mb-3">
          <label>Contraseña</label>
          <input 
            type="password" 
            className="form-control" 
            value={pw} 
            onChange={e => setPw(e.target.value)} 
            required
          />
        </div>

        {/* Campo para repetir la contraseña */}
        <div className="mb-3">
          <label>Repite contraseña</label>
          <input 
            type="password" 
            className="form-control" 
            value={pw2} 
            onChange={e => setPw2(e.target.value)} 
            required
          />
        </div>

        {/* Botón para enviar el formulario */}
        <button className="btn btn-primary">Crear cuenta</button>
      </form>
    </div>
  );
}
