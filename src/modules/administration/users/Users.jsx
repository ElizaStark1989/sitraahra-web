import "./Users.css";
import { Link } from "react-router-dom";


function Users() {
    return (
        <div className="users">
            <h1>Gestión de Usuarios</h1>

            <div className="users-action">

                <Link to= "/administration/users/create">
                    <button>Crear usuario</button>
                </Link>

                <Link to="/administration/users/list">
                    <button>Lista de usuarios</button>
                </Link>

            </div>
        </div>
    )
};

export default Users;