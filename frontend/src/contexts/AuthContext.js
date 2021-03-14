import React, { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import authReducer from '../reducers/authReducer';
import authInitialState from './initialStates/authInitialState';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [auth, dispatch] = useLocalStorage('auth', authReducer, authInitialState);

    return (
        <AuthContext.Provider value={{ auth, dispatch }} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;