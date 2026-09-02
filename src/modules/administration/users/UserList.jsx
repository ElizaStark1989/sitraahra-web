import "./UserList.css";
import { Link } from "react-router-dom";

function UserList () {
    return (
        <div className="user-list">
            <h1>Lista de usuarios</h1>

            <table className="users-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>María Gómez</td>
                        <td>maria@email.com</td>
                        <td>Administrador</td>
                        <td>
                            <Link to="/administration/users/edit">
                                <button>Editar</button>
                            </Link>

                            <Link to="/administration/users/delete">
                                <button>Eliminar</button>
                            </Link>
                        </td>
                    </tr>

                    <tr>
                        <td>Carlos Pérez</td>
                        <td>carlos@email.com</td>
                        <td>Usuario</td>
                        <td>
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default UserList;