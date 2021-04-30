import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../helpers/axiosInstance';
import { useHistory } from 'react-router-dom';
import ListingCard from '../../Shared/ListingCard';
import Spinner from '../../Utils/Spinner';
import { useUserContext } from '../../../contexts/UserContext';
import Container from 'react-bootstrap/esm/Container';
import CardColumns from 'react-bootstrap/esm/CardColumns';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

const ListingHistory = ({link, message}) => {
  const history = useHistory();
  const { context } = useUserContext();
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchListings(0);
  }, [])

  const handlePageChange = (page) => {
    fetchListings(page - 1);
  }

  const fetchListings = (page) => {
    axiosInstance(history).get(`/listings/${link}/${context.data.id}?per_page=10&page=${page}`)
      .then(res => {
        setLoading(false);
        setError(false);
        setData(res.data);
        document.getElementById("top").scrollIntoView({ behavior: "smooth" });
      })
      .catch(err => {
        setLoading(false);
        setError('Neuspješno dohvaćanje oglasa');
        console.log(err);
      });
  }

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
    <Container fluid id="top">
      {data && data.data.length === 0 &&
        <div className="text-center py-5 my-5">
          <p>{message}</p>
          <Button variant="blueAccent" className="no-border-radius">
            <Link to="/user/create" className="text-white text-uppercase" style={{ textDecoration: 'none' }}>Kreiraj oglas</Link>
          </Button>
        </div>
      }

      <CardColumns className="my-4">
        {data && data.data.map((l, index) => (
          <div key={index}>
            <ListingCard listing={l} type="user" />
          </div>
        ))}
      </CardColumns>

      {data && data.data.length !== 0 &&
        <div className="text-center">
          <Pagination
            className="d-inline-block mb-4"
            count={data.total_pages}
            onChange={(_, page) => handlePageChange(page)}
            showFirstButton showLastButton
          />
        </div>}
    </Container>
  );
}

export default ListingHistory;