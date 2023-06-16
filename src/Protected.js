import React from "react";
import { Navigate , Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const role = localStorage.getItem('role');

    if(role != null){
        return (role.toLowerCase() === "admin") ? <Outlet /> : <Navigate to="/user-movie-page" />;
    }

    return (role === "admin") ? <Outlet /> : <Navigate to="/user-movie-page" />;
}

export default ProtectedRoute;
