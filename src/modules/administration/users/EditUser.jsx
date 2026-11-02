import "./EditUser.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditUser() {

    const { id } = useParams();
    const navigate = useNavigate();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const selectedUser = users.find((user) => user.id === id);

    const [name, setName] = useState(selectedUser?.name || "");
    const [email, setEmail] = useState(selectedUser?.email || "");
    const [role, setRole] = useState(selectedUser?.role || "user");

    console.log("Usuario seleccionado:", selectedUser);

    console.log("ID del usuario:", id);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUsers = users.map((user) =>
            user.id === id
                ? { ...user, name, email, role }
                : user
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        navigate("/administration/users/list");

        console.log("Usuarios actualizados:", updatedUsers);

        console.log("Nombre:", name);
        console.log("Correo:", email);
        console.log("Rol:", role);
    };

    return (
        <div className="edit-user">
            <h1>Editar usuario</h1>

            <form className="edit-user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Rol</label>
                    <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                    </select>
                </div>

                <button type="submit">Guardar Cambios</button>

            </form>
        </div>
    )
}

export default EditUser;