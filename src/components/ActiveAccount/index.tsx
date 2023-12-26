import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useBank } from '../../BankContext';
const ActiveAccountRoute = () => {
    const { isAuthenticated, conta } = useBank();
    
    return isAuthenticated() && conta?.flag_ativo ? <Outlet /> : <Navigate to="/app" />;
}
export default ActiveAccountRoute