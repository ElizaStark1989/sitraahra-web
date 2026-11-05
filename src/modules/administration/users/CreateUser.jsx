import "./CreateUser.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CreateUser() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            id: crypto.randomUUID(),
            name: name,
            email: email,
            role: role,
            status: "Activo"
        };

        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const emailExists = savedUsers.some(
            (user) => user.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (emailExists) {
            await Swal.fire({
                title: "Correo ya registrado",
                text: "Ya existe un usuario con este correo electrónico.",
                icon: "warning",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#603b80"
            });

            setName("");
            setEmail("");
            setPassword("");
            setRole("");
            
            return;
        }

        savedUsers.push(newUser);

        localStorage.setItem("users", JSON.stringify(savedUsers));

        await Swal.fire({
            title: "¡Usuario creado!",
            text: "El usuario se ha registrado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#603b80"
        });

        navigate("/administration/users");
    };

    return (
        <div className="create-user">
            <h1>Crear usuario</h1>

            <form className="create-user-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Ingrese el nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingrese correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingrese la contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Rol</label>
                    <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>
                </div>

                <button type="submit">Guardar Usuario</button>

            </form>

        </div>
    );
}

export default CreateUser;