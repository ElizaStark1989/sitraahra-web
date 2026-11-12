import "./ProductsServices.css";
import { Link } from "react-router-dom";

function ProductsServices() {
  return (
    <div className="products-services">
      <div className="products-services-content">

        <header className="products-services-header">
          <h1>Productos y Servicios</h1>
          <p>Administra los productos y servicios de SitraAhra.</p>
        </header>

        <div className="products-services-grid">

          <Link to="/products-services/products" className="products-services-link">
            <div className="products-services-card">
              <h2>Productos</h2>
              <p>Registra, consulta y administra los productos.</p>
            </div>
          </Link>

          <Link to="/products-services/services" className="products-services-link">
            <div className="products-services-card">
              <h2>Servicios</h2>
              <p>Registra, consulta y administra los servicios y rituales.</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default ProductsServices;