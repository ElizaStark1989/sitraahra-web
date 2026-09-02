import "./Administration.css";
import { Link } from "react-router-dom";

function Administration () {
    return(

        <div className="administration">
            <h1>Administración</h1>

            <div className="administration-grid">

                <Link to="/administration/users" className="administration-link">
                    <div className="administration-card">
                        <h2>Gestión de Usuarios</h2>
                    </div>
                </Link>

                <Link to="/administration/roles" className="administration-link">
                    <div className="administration-card">
                        <h2>Roles y permisos</h2>
                    </div>
                </Link>

                <div className="administration-card">
                    <h2>Seguridad</h2>
                </div>

            </div>
        </div>

        
    );
}

export default Administration;
