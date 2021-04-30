import { SET_SIDEBAR_SHOW } from "../../constants/actionTypes";

const sidebar = (value) => (dispatch) => {
  dispatch({ type: SET_SIDEBAR_SHOW, payload: value});
};

export default sidebar;