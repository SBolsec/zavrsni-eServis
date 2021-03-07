import { Redirect } from 'react-router-dom';
import isAuthenticated from './isAuthenticated';

const redirectToDashboard = (auth) => {
    if (isAuthenticated()) {
        switch (auth.data.user.userType) {
            case 'obican':
                return <Redirect to='/user/dashboard' />;
            case 'serviser':
                return <Redirect to='/service/dashboard' />;
            case 'admin':
                return <Redirect to='/admin/dashboard' />;
            default:
                return <Redirect to='/' />;
        }
    }
}

export default redirectToDashboard;