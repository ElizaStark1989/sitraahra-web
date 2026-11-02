import "./UserList.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function UserList() {

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="user-list">
            <h1>Lista de usuarios</h1>

            <div className="user-search">
                <input
                    type="text"
                    placeholder="Escribe el nombre o correo del usuario"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button type="button">
                    Consultar usuario
                </button>
            </div>

            <table className="users-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role === "admin" ? "Administrador" : "Usuario"}</td>
                            <td>{user.status}</td>
                            <td>
                                <Link to={`/administration/users/edit/${user.id}`}>
                                    <button>Editar</button>
                                </Link>

                                <Link to={`/administration/users/delete/${user.id}`}>
                                    <button>Eliminar</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default UserList;