import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import './404.css';

const NotFound = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/');
    }, 3000);
  }, [])

  return (
    <div
      className="text-center d-flex flex-column align-items-center justify-content-center"
      style={{ background: '#f0f0f2', height: '100vh' }}>
      <h3 className="my-4 font-weight-bold">Greška 404: stranica nije pronađena</h3>
      <div className="not-found-img mt-3">
        <img className="img-fluid " src="/images/greska_404.png" alt="greska" />
      </div>
    </div>
  );
}

export default NotFound;