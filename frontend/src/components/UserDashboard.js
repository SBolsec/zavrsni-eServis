import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import logout from '../actions/auth/logout';
import Button from "react-bootstrap/esm/Button";
import { useHistory } from "react-router-dom";
import axiosInstance from '../helpers/axiosInstance';

const UserDashboard = () => {
    const history = useHistory();
    const { auth, dispatch } = useAuth();

    const [test, setTest] = useState('');
    useEffect(() => {
        axiosInstance(history).get('/test')
            .then((response) => setTest(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            Logged in as user
            <br />
            {auth.data.email}
            <hr />
            <Button onClick={() => logout(history)(dispatch)}>Logout</Button>

            <hr />

            <pre>{JSON.stringify(test, null, 2)}</pre>

        </div>
    );
}

export default UserDashboard;