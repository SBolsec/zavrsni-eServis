import Homepage from "../components/Homepage";
import Login from "../components/Auth/Login";
import SignupService from "../components/Auth/SignupService";
import SignupUser from "../components/Auth/SignupUser";
import UserLayout from "../components/UserDashboard/UserLayout";
import ServiceLayout from "../components/ServiceDashboard/ServiceLayout";
import { ROLE_USER, ROLE_SERVICE, ROLE_ADMIN } from '../constants/global';
import Logout from "../components/Logout";
import { USER_DASHBOARD, USER_LISTINGS_ACTIVE, USER_LISTINGS_HISTORY, USER_MESSAGES, USER_PROFILE, USER_SERVICERS } from "../constants/userContent";
import { SERVICE_DASHBOARD, SERVICE_MESSAGES, SERVICE_PROFILE, SERVICE_SEARCH, SERVICE_OFFERS_ACTIVE, SERVICE_OFFERS_HISTORY, SERVICE_SERVICERS } from '../constants/serviceContent';

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
        path: '/logout',
        exact: false,
        component: Logout,
        title: 'Odjava',
        needsAuth: true,
        roles: [ROLE_USER, ROLE_SERVICE, ROLE_ADMIN]
    },
    {
        path: '/user/dashboard',
        exact: false,
        component: UserLayout,
        title: 'Nadzorna ploča',
        needsAuth: true,
        roles: [ROLE_USER],
        content: USER_DASHBOARD
    },
    {
        path: '/user/messages',
        exact: false,
        component: UserLayout,
        title: 'Poruke',
        needsAuth: true,
        roles: [ROLE_USER],
        content: USER_MESSAGES
    },
    {
        path: '/user/active',
        exact: false,
        component: UserLayout,
        title: 'Aktivni oglasi',
        needsAuth: true,
        roles: [ROLE_USER],
        content: USER_LISTINGS_ACTIVE
    },
    {
        path: '/user/history',
        exact: false,
        component: UserLayout,
        title: 'Povijest oglasa',
        needsAuth: true,
        roles: [ROLE_USER],
        content: USER_LISTINGS_HISTORY
    },
    {
        path: '/user/servicers',
        exact: false,
        component: UserLayout,
        title: 'Pretraga servisera',
        needsAuth: true,
        roles: [ROLE_USER],
        content: USER_SERVICERS
    },
    {
        path: '/user/profile',
        exact: false,
        component: UserLayout,
        title: 'Profil',
        needsAuth: true,
        roles: [ROLE_USER],
        content: USER_PROFILE
    },
    {
        path: '/service/dashboard',
        exact: false,
        component: ServiceLayout,
        title: 'Nadzorna ploča',
        needsAuth: true,
        roles: [ROLE_SERVICE],
        content: SERVICE_DASHBOARD
    },
    {
        path: '/service/messages',
        exact: false,
        component: ServiceLayout,
        title: 'Poruke',
        needsAuth: true,
        roles: [ROLE_SERVICE],
        content: SERVICE_MESSAGES
    },
    {
        path: '/service/active',
        exact: false,
        component: ServiceLayout,
        title: 'Aktivne ponude',
        needsAuth: true,
        roles: [ROLE_SERVICE],
        content: SERVICE_OFFERS_ACTIVE
    },
    {
        path: '/service/history',
        exact: false,
        component: ServiceLayout,
        title: 'Povijest ponuda',
        needsAuth: true,
        roles: [ROLE_SERVICE],
        content: SERVICE_OFFERS_HISTORY
    },
    {
        path: '/service/servicers',
        exact: false,
        component: ServiceLayout,
        title: 'Pretraga servisera',
        needsAuth: true,
        roles: [ROLE_SERVICE],
        content: SERVICE_SERVICERS
    },
    {
        path: '/service/profile',
        exact: false,
        component: ServiceLayout,
        title: 'Profil',
        needsAuth: true,
        roles: [ROLE_SERVICE],
        content: SERVICE_PROFILE
    },
    {
        path: '/service/search',
        exact: false,
        component: ServiceLayout,
        title: 'Pretraga oglasa',
        needsAuth: true,
        roles: [ROLE_SERVICE],
        content: SERVICE_SEARCH
    },
];

export default routes;