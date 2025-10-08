import React from "react";
import { Navigate, Outlet } from "react-router-dom"

export default function ProtextedRoute(){
    const token = localStorage.getItem("tokem");

    if(!token){
        return <Navigate to="/" replace />
    }

    return(
        <>
           <Outlet />
        </>
    )
}