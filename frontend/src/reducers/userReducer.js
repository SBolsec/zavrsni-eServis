import {
  SET_SIDEBAR_SHOW,
  USER_DATA_ERROR,
  USER_DATA_LOADING,
  USER_DATA_SUCCESS,
} from "../constants/actionTypes";

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_SIDEBAR_SHOW:
      return {
        ...state,
        sidebarShow: payload,
      };
    case USER_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case USER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USER_DATA_SUCCESS:
      return {
          ...state,
          loading: false,
          error: false,
          data: payload
      };
    default:
      return state;
  }
};

export default userReducer;
