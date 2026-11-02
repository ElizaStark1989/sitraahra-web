import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const testEmail = "admin@sitraahra.com";
        const testPassword = "123456";

        if (email === testEmail && password === testPassword) {
            sessionStorage.setItem("isAuthenticated", "true");

            alert("Inicio de sesión exitoso");

            navigate("/");
        } else {
            alert("Correo o contraseña incorrectos");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>SitraAhra Web</h1>
                <h2>Bienvenido, inicia sesión</h2>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingresa tu correo"
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>

                    <button className="login-button" type="submit">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;