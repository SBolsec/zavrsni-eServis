import Homepage from "../components/Homepage";
import Login from "../components/Auth/Login";
import SignupService from "../components/Auth/SignupService";
import SignupUser from "../components/Auth/SignupUser";
import UserDashboard from "../components/UserDashboard";
import ServiceDashboard from "../components/ServiceDashboard";
import { ROLE_USER, ROLE_SERVICE, ROLE_ADMIN } from '../constants/global';

const routes = [
    {
        path: '/',
        exact: true,
        component: Homepage,
        title: 'Početna Stranica',
        needsAuth: false,
        roles: []
    },
    {
        path: '/login',
        exact: false,
        component: Login,
        title: 'Prijava',
        needsAuth: false,
        roles: []
    },
    {
        path: '/signup/user',
        exact: false,
        component: SignupUser,
        title: 'Registracija Korisnika',
        needsAuth: false,
        roles: []
    },
    {
        path: '/signup/service',
        exact: false,
        component: SignupService,
        title: 'Registracija Servisa',
        needsAuth: false,
        roles: []
    },
    {
        path: '/user/dashboard',
        exact: false,
        component: UserDashboard,
        title: 'Nadzorna ploča',
        needsAuth: true,
        roles: [ROLE_USER]
    },
    {
        path: '/service/dashboard',
        exact: false,
        component: ServiceDashboard,
        title: 'Nadzorna ploča',
        needsAuth: true,
        roles: [ROLE_SERVICE]
    }
];

export default routes;