import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, LOGIN_ERROR_REMOVE, REGISTER_LOADING, REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_ERROR_REMOVE, REGISTER_AFTER_REDIRECT, UPLOAD_PROFILE_PICTURE_LOADING, UPLOAD_PROFILE_PICTURE_SUCCESS, UPLOAD_PROFILE_PICTURE_ERROR, UPDATE_AUTH_DATA } from "../constants/actionTypes";
import authInitialState from '../contexts/initialStates/authInitialState';
import getRole from '../utils/getRole';

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
            return {
                ...state,
                loading: false,
                error: false,
                data: {
                    success: true
                }
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: {
                    userId: payload.id,
                    role: getRole(payload.roleId),
                    tokenVersion: payload.tokenVersion,
                    email: payload.email,
                    profilePictureURL: payload.profilePictureURL,
                    profilePictureSet: payload.profilePictureSet
                }
            }
        case REGISTER_AFTER_REDIRECT:
            return {
                ...state,
                data: null
            }
        case LOGOUT:
            return authInitialState;
        case UPLOAD_PROFILE_PICTURE_LOADING:
            return {
                ...state,
                loading: true,
                error: false
            };
        case UPLOAD_PROFILE_PICTURE_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        case UPLOAD_PROFILE_PICTURE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: {
                    ...state.data,
                    profilePictureSet: true,
                    profilePictureURL: payload
                }
            };
        case UPDATE_AUTH_DATA:
            return {
                ...state,
                loading: false,
                error: false,
                data: {
                    userId: payload.id,
                    role: getRole(payload.roleId),
                    tokenVersion: payload.tokenVersion,
                    email: payload.email,
                    profilePictureURL: payload.profilePictureURL,
                    profilePictureSet: payload.profilePictureSet
                }
            }
        default:
            return state;
    }
}

export default authReducer;