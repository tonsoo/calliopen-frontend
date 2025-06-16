import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Loading from "./components/blocks/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import applyToken, { getToken } from "./http/token";
import { ApiError, UserService } from "./api";
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

export default function AppRoutes() {
    const navigate = useNavigate();

    applyToken();
    const token = getToken();
    
    const query = useQuery({
        queryKey: ['load-user'],
        staleTime: 1000 * 60 * 2,
        retry: false,
        enabled: !!token,
        queryFn: () => UserService.getUserInformation()
    });

    useEffect(() => {
        if (query.isError) {
            const err = query.error as ApiError;
            if (err.status == 401) {
                console.log('here');
                navigate("/login", { replace: true });
            }
        }
    }, [query.isError, query.error, navigate, token]);

    if (query.isLoading) return <Loading />;

    const isLoggedIn = query.data !== undefined && !!token;
    const isAuthPage = location.pathname === '/login';

    if (!token && !isAuthPage) return <Navigate to="/login" replace />;
    if (isLoggedIn && isAuthPage) return <Navigate to="/" replace />;

    return (
        <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
    );
}