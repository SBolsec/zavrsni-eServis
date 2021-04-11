import Button from 'react-bootstrap/esm/Button';
import React from 'react';
import Moment from 'react-moment';
import { useAuth } from '../../contexts/AuthContext';

const OfferCard = ({ offer, userId }) => {
  const { auth } = useAuth();

  return (
    <div
      className="my-4 d-flex flex-column flex-sm-row justify-content-between align-items-center"
      style={{ border: '1px solid gray' }}
    >
      <div className="p-3 flex-grow-1">
        <h5>{offer.title}</h5>
        <p>{offer.description}</p>
        <p>
          <span>Cijena: </span>{offer.price} <span> KN</span>
        </p>
        <p>
          <span className="text-gray" style={{ fontSize: '0.8em' }}>Objavljen: </span>
          <Moment format="DD.MM.YYYY">{offer.createdAt}</Moment>
        </p>
        <hr />
        <div>
          <img src={offer.service.profilePicture.url} alt="profilePicture" className="rounded-circle ml-2" style={{ width: '45px', height: '45px' }} />
          <span className="ml-2">{offer.service.name}</span>
          <span className="ml-2 text-gray"> TODO: zvijezdice od recenzija</span>
        </div>
      </div>

      {auth.data.userId == userId &&
        <div className="p-3 d-flex flex-row flex-sm-column">
          <Button variant="success" className="no-round m-2 text-uppercase">Prihvati</Button>
          <Button variant="danger" className="no-round m-2 text-uppercase">Odbij</Button>
        </div>
      }
    </div>
  );
}

export default OfferCard;