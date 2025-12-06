// Página para iniciar sesión.
// Envía email y password al backend, que verifica en MongoDB.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  // Estados para email y password escritos por el usuario.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para mostrar mensajes de error.
  const [error, setError] = useState("");

  // Esta función se ejecuta cuando se envía el formulario de login.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación simple del lado del front.
    if (!email || !password) {
      setError("Debes ingresar correo y contraseña");
      return;
    }

    try {
      // Llamamos al backend para validar las credenciales.
      const data = await loginUser({ email, password });

      // Si llegamos aquí, el backend respondió OK.
      // Mostramos el mensaje del backend.
      alert(data.msg || "Login correcto");

      // Si tu backend ya devuelve usuario, podrías verlo en consola.
      console.log("Respuesta de login:", data);

      // Redirigimos, por ejemplo, al catálogo.
      navigate("/catalogo");
    } catch (err) {
      // Si el backend envió error (correo o contraseña incorrectos),
      // se muestra en pantalla.
      setError(err.message);
    }
  };

  // Esta función permite ir a la pantalla de registro desde un botón.
  const irARegistro = () => {
    navigate("/register");
  };

  return (
    <div className="contenedor-form">
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Correo electrónico
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // actualiza estado al escribir
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/* Mensaje de error en caso de problema */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Ingresar</button>
      </form>

      {/* Botón para ir a la pantalla de registro */}
      <button onClick={irARegistro}>Registrarme</button>
    </div>
  );
}

export default LoginPage;
