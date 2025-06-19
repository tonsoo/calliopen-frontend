import Dashboard from "./pages/dashboard/Dashboard";
import Loading from "./components/blocks/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import applyToken, { getToken, hasMultipleAccounts, removeToken, setToken } from "./http/token";
import { ApiError, UserService } from "./api";
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import AlbumPage from "./pages/albums/album/AlbumPage";
import MyPlaylists from "./pages/playlists/my-playlists/MyPlaylists";

export default function AppRoutes() {
    const navigate = useNavigate();

    const token = getToken();
    applyToken(token);
    
    const query = useQuery({
        queryKey: ['load-user'],
        staleTime: 1000 * 60 * 2,
        retry: false,
        enabled: !!token,
        queryFn: UserService.getUserInformation
    });

    useEffect(() => {
        if (query.isLoading || !query.isFetched) return;

        if (query.isError) {
            const err = query.error as ApiError;
            if (err.status == 401) {
                removeToken(token ?? null);
                navigate(routesList.login, { replace: true });
            }
            return;
        }

        if (!token || !query.data) return;
        setToken(token, query.data);
    }, [query.isError, query.error, navigate, token, query.isLoading]);

    if (query.isLoading) return <Loading />;

    const isLoggedIn = query.data && !!token;
    const isAuthPage = [routesList.login, routesList.loginToAccount, routesList.register].includes(location.pathname);

    if (!token && !isAuthPage || (!hasMultipleAccounts() && location.pathname === routesList.loginToAccount)) return <Navigate to={routesList.login} replace />;
    if (isLoggedIn && isAuthPage) return <Navigate to={routesList.dashboard} replace />;

    return (
        <Routes>
            <Route path={routesList.dashboard} element={<Dashboard />}></Route>
            <Route path={routesList.login} element={<Login />}></Route>
            <Route path={routesList.loginToAccount} element={<Login />}></Route>
            <Route path={routesList.register} element={<Login />}></Route>
            <Route path={routesList.album.path} element={<AlbumPage />}></Route>
            <Route path={routesList.song.path} element={<Login />}></Route>
            <Route path={routesList.library} element={<MyPlaylists />}></Route>
        </Routes>
    );
}

export const routesList = {
    login: '/auth/login',
    loginToAccount: '/auth/login/select',
    register: '/auth/register',
    dashboard: '/',
    album: {
        path: '/albums/:uuid',
        link: (uuid:string) => routesList.album.path.replace(':uuid', uuid),
    },
    song: {
        path: '/songs/:uuid',
        link: (uuid:string) => routesList.song.path.replace(':uuid', uuid),
    },
    playlist: {
        path: '/playlists/:uuid',
        link: (uuid:string) => routesList.playlist.path.replace(':uuid', uuid),
    },
    library: '/library',
};