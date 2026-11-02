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

        </Route>

      </Routes>
    </BrowserRouter>
  )

}

export default App;
