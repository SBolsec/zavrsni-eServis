import {
  SET_SIDEBAR_SHOW,
  SERVICE_DATA_ERROR,
  SERVICE_DATA_SUCCESS,
  SERVICE_DATA_LOADING,
  SERVICE_FAULT_ERROR,
  SERVICE_FAULT_SUCCESS,
  SERVICE_FAULT_LOADING
} from "../constants/actionTypes";

const serviceReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_SIDEBAR_SHOW:
      return {
        ...state,
        sidebarShow: payload,
      };
    case SERVICE_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SERVICE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case SERVICE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    case SERVICE_FAULT_ERROR:
      return {
        ...state,
        loadingFault: false,
        errorFault: payload,
      };
    case SERVICE_FAULT_LOADING:
      return {
        ...state,
        loadingFault: true,
        errorFault: false,
      };
    case SERVICE_FAULT_SUCCESS:
      return {
        ...state,
        loadingFault: false,
        errorFault: false,
        data: {
          ...state.data,
          faultCategories: payload.faultCategories
        },
      };
    default:
      return state;
  }
};

export default serviceReducer;
