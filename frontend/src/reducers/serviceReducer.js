import { SET_SIDEBAR_SHOW } from '../constants/actionTypes';
import serviceInitialState from '../contexts/initialStates/serviceInitialState';

const serviceReducer = (state, { type, payload }) => {
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

export default serviceReducer;