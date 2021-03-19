import Homepage from "../components/Homepage";
import Login from "../components/Auth/Login";
import SignupService from "../components/Auth/SignupService";
import SignupUser from "../components/Auth/SignupUser";
import UserLayout from "../components/UserDashboard/UserLayout";
import ServiceLayout from "../components/ServiceDashboard/ServiceLayout";
import Logout from "../components/Logout";
import { ROLE_USER, ROLE_SERVICE, ROLE_ADMIN, AUTH_ANY, AUTH_REQUIRED, AUTH_NONE } from '../constants/global';
import { USER_DASHBOARD, USER_LISTINGS_ACTIVE, USER_LISTINGS_HISTORY, USER_MESSAGES, USER_PROFILE, USER_SERVICERS } from "../constants/userContent";
import { SERVICE_DASHBOARD, SERVICE_MESSAGES, SERVICE_PROFILE, SERVICE_SEARCH, SERVICE_OFFERS_ACTIVE, SERVICE_OFFERS_HISTORY, SERVICE_SERVICERS } from '../constants/serviceContent';
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
        path: '/user/dashboard',
        exact: false,
        component: UserLayout,
        title: 'Nadzorna ploča',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_USER],
        content: USER_DASHBOARD
    },
    {
        path: '/user/messages',
        exact: false,
        component: UserLayout,
        title: 'Poruke',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_USER],
        content: USER_MESSAGES
    },
    {
        path: '/user/active',
        exact: false,
        component: UserLayout,
        title: 'Aktivni oglasi',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_USER],
        content: USER_LISTINGS_ACTIVE
    },
    {
        path: '/user/history',
        exact: false,
        component: UserLayout,
        title: 'Povijest oglasa',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_USER],
        content: USER_LISTINGS_HISTORY
    },
    {
        path: '/user/servicers',
        exact: false,
        component: UserLayout,
        title: 'Pretraga servisera',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_USER],
        content: USER_SERVICERS
    },
    {
        path: '/user/profile',
        exact: false,
        component: UserLayout,
        title: 'Profil',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_USER],
        content: USER_PROFILE
    },
    {
        path: '/service/dashboard',
        exact: false,
        component: ServiceLayout,
        title: 'Nadzorna ploča',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_SERVICE],
        content: SERVICE_DASHBOARD
    },
    {
        path: '/service/messages',
        exact: false,
        component: ServiceLayout,
        title: 'Poruke',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_SERVICE],
        content: SERVICE_MESSAGES
    },
    {
        path: '/service/active',
        exact: false,
        component: ServiceLayout,
        title: 'Aktivne ponude',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_SERVICE],
        content: SERVICE_OFFERS_ACTIVE
    },
    {
        path: '/service/history',
        exact: false,
        component: ServiceLayout,
        title: 'Povijest ponuda',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_SERVICE],
        content: SERVICE_OFFERS_HISTORY
    },
    {
        path: '/service/servicers',
        exact: false,
        component: ServiceLayout,
        title: 'Pretraga servisera',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_SERVICE],
        content: SERVICE_SERVICERS
    },
    {
        path: '/service/profile',
        exact: false,
        component: ServiceLayout,
        title: 'Profil',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_SERVICE],
        content: SERVICE_PROFILE
    },
    {
        path: '/service/search',
        exact: false,
        component: ServiceLayout,
        title: 'Pretraga oglasa',
        needsAuth: AUTH_REQUIRED,
        roles: [ROLE_SERVICE],
        content: SERVICE_SEARCH
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