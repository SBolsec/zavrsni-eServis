import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import serviceReducer from '../reducers/serviceReducer';
import serviceInitialState from './initialStates/serviceInitialState';

export const ServiceContext = createContext();

export const useServiceContext = () => {
  return useContext(ServiceContext);
}

const ServiceContextProvider = ({ children }) => {
  const [context, dispatch] = useLocalStorage('service', serviceReducer, serviceInitialState);

  return (
    <ServiceContext.Provider value={{ context, dispatch }} >
      {children}
    </ServiceContext.Provider>
  );
}

export default ServiceContextProvider;