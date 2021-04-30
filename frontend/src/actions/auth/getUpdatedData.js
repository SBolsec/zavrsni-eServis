import axiosInstance from '../../helpers/axiosInstance';
import { UPDATE_AUTH_DATA } from '../../constants/actionTypes';

const getUpdatedData = ({userId}) => (dispatch) => {
    axiosInstance()
        .get(`/users/id/${userId}`)
        .then((res) => {
            dispatch({
                type: UPDATE_AUTH_DATA,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

export default getUpdatedData;