import { Redirect } from 'react-router-dom';
import isAuthenticated from './isAuthenticated';
import { ROLE_USER, ROLE_SERVICE, ROLE_ADMIN } from '../constants/global';

const redirectToDashboard = (auth) => {
    if (isAuthenticated()) {
        switch (auth.data.role) {
            case ROLE_USER:
                return <Redirect to='/user/dashboard' />;
            case ROLE_SERVICE:
                return <Redirect to='/service/dashboard' />;
            case ROLE_ADMIN:
                return <Redirect to='/admin/dashboard' />;
            default:
                return <Redirect to='/' />;
        }
    }
}

export default redirectToDashboard;