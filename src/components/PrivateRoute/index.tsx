import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useBank } from '../../BankContext';
const PrivateRoute = () => {
    const { isAuthenticated } = useBank();
    console.log(isAuthenticated());
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute