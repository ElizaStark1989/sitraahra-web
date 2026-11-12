import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./modules/dashboard/Dashboard";
import Administration from "./modules/administration/Administration";
import Users from "./modules/administration/users/Users";
import CreateUser from "./modules/administration/users/CreateUser";
import UserList from "./modules/administration/users/UserList";
import EditUser from "./modules/administration/users/EditUser";
import DeleteUser from "./modules/administration/users/DeleteUser";
import Roles from "./modules/administration/roles/Roles";
import CreateRole from "./modules/administration/roles/CreateRole";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Clients from "./modules/clients/Clients";
import CreateClient from "./modules/clients/CreateClient";
import ClientList from "./modules/clients/ClientList";
import EditClient from "./modules/clients/EditClient";
import DeleteClient from "./modules/clients/DeleteClient";
import ProductsServices from "./modules/products-services/ProductsServices";
import Products from "./modules/products-services/products/Products";
import CreateProduct from "./modules/products-services/products/CreateProduct";
import Services from "./modules/products-services/services/Services";
import Orders from "./modules/orders/Orders";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/administration/users" element={<Users />} />
          <Route path="/administration/users/create" element={<CreateUser />} />
          <Route path="/administration/users/list" element={<UserList />} />
          <Route path="/administration/users/edit/:id" element={<EditUser />} />
          <Route path="/administration/users/delete/:id" element={<DeleteUser />} />
          <Route path="/administration/roles" element={<Roles />} />
          <Route path="/administration/roles/create" element={<CreateRole />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/create" element={<CreateClient />} />
          <Route path="/clients/list" element={<ClientList />} />
          <Route path="/clients/edit/:id" element={<EditClient />} />
          <Route path="/clients/delete/:id" element={<DeleteClient />} />
          <Route path="/products-services" element={<ProductsServices />} />
          <Route path="/products-services/products" element={<Products />} />
          <Route path="/products-services/products/create" element={<CreateProduct />} />
          <Route path="/products-services/services" element={<Services />} />
          <Route path="/orders" element={<Orders />} />

        </Route>
        
        {/* Página no encontrada */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )

}

export default App;
