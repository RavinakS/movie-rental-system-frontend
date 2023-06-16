import React from "react";
import { Navigate , Outlet } from "react-router-dom";

export default function IsAuthenticated(){
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    return isAuthenticated ? < Navigate to='/user-movie-page' /> : <Outlet />;
}
