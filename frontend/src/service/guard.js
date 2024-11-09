import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ApiService from './ApiService';

export const ProtectedRoute = ({ element: Component }) => {
    const location = useLocation();

    return ApiService.isAuthenticated() ? (
        Component
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export const AdminRoute = ({ element: Component }) => {
    const location = useLocation();

    return ApiService.isAdmin() ? (
        Component
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}
