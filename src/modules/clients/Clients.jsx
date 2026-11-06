import "./Clients.css";
import { Link } from "react-router-dom";

function Clients() {
    return (
        <div className="clients">
            <h1>Clientes</h1>

            <div className="clients-grid">

                <Link to="/clients/create" className="clients-link">
                    <div className="clients-card">
                        <h2>Registrar cliente</h2>
                    </div>
                </Link>

                <Link to="/clients/list" className="clients-link">
                    <div className="clients-card">
                        <h2>Consultar clientes</h2>
                    </div>
                </Link>

                <Link to="/clients/history" className="clients-link">
                    <div className="clients-card">
                        <h2>Historial de pedidos</h2>
                    </div>
                </Link>

            </div>
        </div>
    );
}

export default Clients;