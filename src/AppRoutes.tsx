import Dashboard from "./pages/dashboard/Dashboard";
import Loading from "./components/blocks/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import applyToken, { getToken } from "./http/token";
import { ApiError, UserService } from "./api";
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/auth/login/Login";

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
                navigate(routesList.login, { replace: true });
            }
        }
    }, [query.isError, query.error, navigate, token]);

    if (query.isLoading) return <Loading />;

    const isLoggedIn = query.data !== undefined && !!token;
    const isAuthPage = location.pathname === routesList.login;
    const isRegisterPage = location.pathname === routesList.register;

    if (!token && !isAuthPage && !isRegisterPage) return <Navigate to={routesList.login} replace />;
    if (isLoggedIn && isAuthPage) return <Navigate to={routesList.dashboard} replace />;

    return (
        <Routes>
            <Route path={routesList.dashboard} element={<Dashboard />}></Route>
            <Route path={routesList.login} element={<Login />}></Route>
            <Route path={routesList.register} element={<Login />}></Route>
        </Routes>
    );
}

export const routesList = {
    login: '/auth/login',
    register: '/auth/register',
    dashboard: '/',
};