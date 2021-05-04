import axiosInstance from "../../helpers/axiosInstance";
import {
  SERVICE_FAULT_ERROR,
  SERVICE_FAULT_LOADING,
  SERVICE_FAULT_SUCCESS,
} from "../../constants/actionTypes";

const updateFaultCategories = ({ faultCategories }) => (dispatch) => {
  dispatch({ type: SERVICE_FAULT_LOADING });

  const ids = faultCategories.map(v => v.id);

  axiosInstance()
    .post("/services/setFaultCategories", {
      faultCategories: ids
    })
    .then((res) => {
      dispatch({
        type: SERVICE_FAULT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SERVICE_FAULT_ERROR,
        payload: err.response
          ? err.response.data.message
          : "Spajanje na poslužitelj neuspješno",
      });
    });
};

export default updateFaultCategories;