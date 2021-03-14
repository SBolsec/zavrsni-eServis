import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import authReducer from '../reducers/authReducer';
import authInitialState from './initialStates/authInitialState';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {
    const [auth, dispatch] = useLocalStorage('auth', authReducer, authInitialState);

    return (
        <AuthContext.Provider value={{ auth, dispatch }} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;