import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import isAuthenticated from "./utils/isAuthenticated";
import redirectToDashboard from "./utils/redirectToDashboard";

const RenderRoute = (route) => {
    const { auth } = useContext(AuthContext);

    document.title = route.title || 'eServis';
    if (route.needsAuth && !isAuthenticated()) {
        return <Redirect to="/login" />
    }
    if (!route.needsAuth && isAuthenticated()) {
        return redirectToDashboard(auth);
    }

    return (
        <Route
            path={route.path}
            exact={route.exact}
            component={route.component}
        />
    );
}

export default RenderRoute;