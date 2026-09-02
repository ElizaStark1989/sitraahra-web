import { Link } from "react-router-dom";
import "./Roles.css";

function Roles() {
    return (
        <div className="roles">
            <div className="roles-header">
                <h1>Roles y permisos</h1>
                <Link to="/administration/roles/create" className="create-role-btn">
                    <button className="create-role-btn">
                        Crear rol
                    </button>
                </Link>
            </div>

            <div className="roles-card">
                <div className="role-title">
                    <h2>Administrador</h2>
                    <span className="role-status active">
                        Activo
                    </span>
                </div>

                <label>
                    <input type="checkbox" defaultChecked />
                    Crear usuarios
                </label>

                <label>
                    <input type="checkbox" defaultChecked />
                    Editar usuarios
                </label>

                <label>
                    <input type="checkbox" defaultChecked />
                    Eliminar usuarios
                </label>

                <label>
                    <input type="checkbox" defaultChecked />
                    Consultar usuarios
                </label>

                <div className="role-actions">
                    <button className="edit-role-btn">
                        Editar
                    </button>

                    <button className="delete-role-btn">
                        Eliminar
                    </button>
                </div>
            </div>

            <div className="roles-card">
                <div className="role-title">
                    <h2>Usuario</h2>
                    <span className="role-status inactive">
                        Inactivo
                    </span>
                </div>

                <label>
                    <input type="checkbox" />
                    Crear usuarios
                </label>

                <label>
                    <input type="checkbox" />
                    Editar usuarios
                </label>

                <label>
                    <input type="checkbox" />
                    Eliminar usuarios
                </label>

                <label>
                    <input type="checkbox" defaultChecked />
                    Consultar usuarios
                </label>

                <div className="role-actions">
                    <button className="edit-role-btn">
                        Editar
                    </button>

                    <button className="delete-role-btn">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Roles;