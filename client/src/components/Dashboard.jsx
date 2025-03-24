import React from 'react'
import { useAuth } from '../middleware/AuthContext'
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />

    return (
        <div>
            <p>Welcome {user.name}</p>
        </div>
    )
}
