import axiosInstance from "../../helpers/axiosInstance";
import {
  SERVICE_DATA_ERROR,
  SERVICE_DATA_LOADING,
  SERVICE_DATA_SUCCESS,
} from "../../constants/actionTypes";

const fetchService = ({ userId }) => (dispatch) => {
  if (typeof userId != 'number') {
    console.log('userId is not a number')
    return;
  }
  
  dispatch({ type: SERVICE_DATA_LOADING });

  axiosInstance()
    .get(`/services/user/${userId}`)
    .then((res) => {
      dispatch({
        type: SERVICE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SERVICE_DATA_ERROR,
        payload: err.response
          ? err.response.data.message
          : "Spajanje na poslužitelj neuspješno",
      });
    });
};

export default fetchService;