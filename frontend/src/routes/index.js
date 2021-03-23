import Homepage from "../components/Homepage";
import Login from "../components/Auth/Login";
import SignupService from "../components/Auth/SignupService";
import SignupUser from "../components/Auth/SignupUser";
import UserLayout from "../components/UserDashboard/UserLayout";
import ServiceLayout from "../components/ServiceDashboard/ServiceLayout";
import Logout from "../components/Logout";
import { ROLE_USER, ROLE_SERVICE, ROLE_ADMIN, AUTH_ANY, AUTH_REQUIRED, AUTH_NONE } from '../constants/global';
import NotFound from "../components/404";

const routes = [
    {
        path: '/',
        exact: true,
        component: Homepage,
        title: 'Početna Stranica',
        needsAuth: AUTH_NONE,
        roles: []
    },
    {
        path: '/login',
        exact: false,
        component: Login,
        title: 'Prijava',
        needsAuth: AUTH_NONE,
        roles: []
    },
    {
        path: '/signup/user',
        exact: false,
        component: SignupUser,
        title: 'Registracija Korisnika',
        needsAuth: AUTH_NONE,
        roles: []
    },
    {
        path: '/signup/service',
        exact: false,
        component: SignupService,
        title: 'Registracija Servisa',
        needsAuth: AUTH_NONE,
        roles: []
    },
    {
        path: '/logout',
        exact: false,
        component: Logout,
        title: 'Odjava',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_USER, ROLE_SERVICE, ROLE_ADMIN]
    },
    {
        path: '/user/',
        exact: false,
        component: UserLayout,
        title: 'Nadzorna ploča',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_USER]
    },
    {
        path: '/service/',
        exact: false,
        component: ServiceLayout,
        title: 'Nadzorna ploča',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_SERVICE]
    },
    {
        path: '*',
        exact: false,
        component: NotFound,
        title: 'Error 404',
        needsAuth: AUTH_ANY,
        roles: []
    }
];

export default routes;