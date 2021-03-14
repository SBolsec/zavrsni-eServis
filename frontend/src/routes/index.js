import Homepage from "../components/Homepage";
import Login from "../components/Auth/Login";
import SignupService from "../components/Auth/SignupService";
import SignupUser from "../components/Auth/SignupUser";
import UserDashboard from "../components/UserDashboard";
import ServiceDashboard from "../components/ServiceDashboard";

const routes = [
    {
        path: '/',
        exact: true,
        component: Homepage,
        title: 'Homepage',
        needsAuth: false
    },
    {
        path: '/login',
        exact: false,
        component: Login,
        title: 'Login',
        needsAuth: false
    },
    {
        path: '/signup/user',
        exact: false,
        component: SignupUser,
        title: 'Signup User',
        needsAuth: false
    },
    {
        path: '/signup/service',
        exact: false,
        component: SignupService,
        title: 'Signup Service',
        needsAuth: false
    },
    {
        path: '/user/dashboard',
        exact: false,
        component: UserDashboard,
        title: 'User Dashboard',
        needsAuth: true
    },
    {
        path: '/service/dashboard',
        exact: false,
        component: ServiceDashboard,
        title: 'User Dashboard',
        needsAuth: true
    }
];

export default routes;