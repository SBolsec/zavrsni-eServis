import axiosInstance from "../../helpers/axiosInstance";
import {
  USER_DATA_ERROR,
  USER_DATA_LOADING,
  USER_DATA_SUCCESS,
} from "../../constants/actionTypes";

const fetchUser = ({ userId }) => (dispatch) => {
  dispatch({ type: USER_DATA_LOADING });

  axiosInstance()
    .get(`/people/user/${userId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: USER_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: USER_DATA_ERROR,
        payload: err.response
          ? err.response.data.message
          : "Spajanje na poslužitelj neuspješno",
      });
    });
};

export default fetchUser;