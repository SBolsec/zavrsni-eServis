import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import userReducer from '../reducers/userReducer';
import userInitialState from './initialStates/userInitialState';

export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
}

const UserContextProvider = ({ children }) => {
  const [context, dispatch] = useLocalStorage('user', userReducer, userInitialState);

  return (
    <UserContext.Provider value={{ context, dispatch }} >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;