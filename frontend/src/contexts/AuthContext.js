import React, { createContext, useEffect, useReducer } from 'react'
import authReducer from '../reducers/authReducer';
import authInitialState from './initialStates/authInitialState';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [auth, dispatch] = useReducer(authReducer, {}, () => {
        const localData = localStorage.getItem('auth');
        return localData ? JSON.parse(localData) : authInitialState;
    });

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth])

    return (
        <AuthContext.Provider value={{ auth, dispatch }} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;