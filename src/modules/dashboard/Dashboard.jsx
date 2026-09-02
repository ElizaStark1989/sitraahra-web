import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  return (

    <div className="dashboard">
      <div className="dashboard-content">
        
        <header className="dashboard-header">
          <h1>SitraAhra Web</h1>
        </header> 

        <div className="modules-grid">

          <Link to="/administration" className="module-link" >
            <div className="module-card">
              <h2>Administración</h2>
            </div>
          </Link>

          <div className="module-card">
            <h2>Gestión de Clientes</h2>
          </div>

          <div className="module-card">
            <h2>Gestión de Pedidos</h2>
          </div>

          <div className="module-card">
            <h2>Productos y Servicios</h2>
          </div>

          <div className="module-card">
            <h2>Gestión Financiera</h2>
          </div>

          <div className="module-card">
            <h2>Marketing</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;