import React, { useEffect } from 'react'
import { useHistory } from 'react-router';

const NotFound = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/');
    }, 3000);
  }, [])

  return (
    <div>
      Custom 404 page
    </div>
  );
}
 
export default NotFound;