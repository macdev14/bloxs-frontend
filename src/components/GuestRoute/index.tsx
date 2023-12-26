import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useBank } from '../../BankContext';
const GuestRoute = () => {
    const { isAuthenticated } = useBank();
    console.log(isAuthenticated());
    return !isAuthenticated() ? <Outlet /> : <Navigate to="/app" />;
}
export default GuestRoute