import { SET_SIDEBAR_SHOW, SERVICE_DATA_ERROR, SERVICE_DATA_SUCCESS, SERVICE_DATA_LOADING} from "../constants/actionTypes";

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
    default:
      return state;
  }
};

export default serviceReducer;
