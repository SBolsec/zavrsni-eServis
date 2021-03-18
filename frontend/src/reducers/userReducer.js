import { SET_SIDEBAR_SHOW } from '../constants/actionTypes';
import userInitialState from '../contexts/initialStates/userInitialState';

const userReducer = (state, { type, payload }) => {
    switch (type) {
        case SET_SIDEBAR_SHOW:
            return {
                ...state,
                sidebarShow: payload
            };
        default: 
            return state;
    }
}

export default userReducer;