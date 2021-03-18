import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logout from '../actions/auth/logout';

const Logout = () => {
  const {dispatch} = useAuth();
  const history = useHistory();

  logout(history)(dispatch);

  return (
    <>
    </>
  );
}
 
export default Logout;