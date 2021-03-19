import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import isAuthenticated from "./utils/isAuthenticated";
import redirectToDashboard from "./utils/redirectToDashboard";
import { AUTH_REQUIRED, AUTH_NONE } from './constants/global';

const RenderRoute = (route) => {
    const { auth } = useAuth();

    document.title = 'e-servis | ' + route.title;
    if (route.needsAuth === AUTH_REQUIRED) {
        if (!isAuthenticated()) {
            return <Redirect to="/login" />
        } else {
            if (!route.roles.includes(auth.data.role)) {
                return redirectToDashboard(auth);
            }
        }
    }
    if (route.needsAuth === AUTH_NONE && isAuthenticated()) {
        return redirectToDashboard(auth);
    }

    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => (
                <route.component {...props} content={route.content} title={route.title} />
            )}
        />
    );
}

export default RenderRoute;