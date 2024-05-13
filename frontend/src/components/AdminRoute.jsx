
import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';


const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get('/api/admin/is-admin');
                setIsAdmin(response.data.isAdmin);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao verificar administrador:', error);
                setLoading(false);
            }
        };

        if (userInfo) {
            checkAdmin();
        } else {
            setLoading(false);
        }
    }, [userInfo]);

    if (loading) {
        return <div className="flex items-center align-middle justify-center">
            <Oval
                type="Oval"
                color="#00BFFF"
                height={300}
                width={300}
            />
        </div>;
    }

    if (!userInfo) {
        return <Navigate to="/" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;