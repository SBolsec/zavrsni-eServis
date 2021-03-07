import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, LOGIN_ERROR_REMOVE, REGISTER_LOADING, REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_ERROR_REMOVE, REGISTER_AFTER_REDIRECT } from "../constants/actionTypes";
import authInitialState from '../contexts/initialStates/authInitialState';

const authReducer = (state, { type, payload }) => {
    switch (type) {
        case REGISTER_ERROR_REMOVE:
        case LOGIN_ERROR_REMOVE:
            return {
                ...state,
                error: false
            }
        case REGISTER_LOADING:
        case LOGIN_LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }
        case REGISTER_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: payload
            }
        case REGISTER_AFTER_REDIRECT:
            return {
                ...state,
                data: null
            }
        case LOGOUT:
            return authInitialState;
        default:
            return state;
    }
}

export default authReducer;