import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const isAuthenticated =
        sessionStorage.getItem("isAuthenticated") === "true";

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;