import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import axiosInstance from '../../../helpers/axiosInstance';
import Spinner from '../../Utils/Spinner';

const ListingDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axiosInstance(history).get(`/listings/${id}`)
      .then(res => {
        setLoading(true);
        setError('');
        console.log(res);
        setListing(res.data);
      })
      .catch(err => {
        setLoading(true);
        setError(true);
        console.log(err);
      });
  })

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
    <div>
      here {id}
    </div>
  );
}

export default ListingDetails;