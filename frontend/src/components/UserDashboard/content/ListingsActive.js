import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../helpers/axiosInstance';
import { useHistory } from 'react-router-dom';
import ListingCard from '../../Shared/ListingCard';
import Spinner from '../../Utils/Spinner';
import { useUserContext } from '../../../contexts/UserContext';
import Container from 'react-bootstrap/esm/Container';

const ListingsActive = () => {
  const history = useHistory();
  const { context } = useUserContext();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axiosInstance(history).get(`/listings/active/${context.data.id}`)
      .then(res => {
        setLoading(false);
        setError(false);
        setListings(res.data);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5 m-5">
        <Spinner className="my-auto mx-auto" />
      </div>
    );
  }

  if (error) {
    return { error }
  }

  return (
    <Container fluid>
      {listings.map((l, index) => (
        <ListingCard key={index} listing={l} type="user" />
      ))}
    </Container>
  );
}

export default ListingsActive;