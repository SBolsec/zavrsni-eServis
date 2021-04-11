import Button from 'react-bootstrap/esm/Button';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../helpers/axiosInstance';
import { useHistory } from 'react-router-dom';
import UpdateOffer from '../ServiceDashboard/content/UpdateOffer';

const OfferCard = ({ offer, authorId }) => {
  const { auth } = useAuth();
  const history = useHistory();
  const [updateMode, setUpdateMode] = useState(false);
  const [offer1, setOffer] = useState(offer);

  const handleOfferDelete = (e) => {
    if (window.confirm("Jeste li sigurni da želite obrisati ponudu?")) {
      axiosInstance(history).delete(`/offers/${offer.id}`)
        .then(res => {
          history.go(0); // refresh page
        })
        .catch(err => {
          alert("Brisanje neuspješno! Greška na poslužitelju.");
          console.log(err);
        })
    }
  }

  const toggleUpdateMode = () => {
    setUpdateMode(!updateMode);
  }

  const updateOffer = (newOffer) => {
    setOffer({
      ...offer1,
      ...newOffer
    })
  }

  return (
    <div
      className="my-4 d-flex flex-column flex-sm-row justify-content-between align-items-center"
      style={{ border: '1px solid gray' }}
    >
      {!updateMode &&
        <div className="p-3 flex-grow-1">
          <h5>{offer1.title}</h5>
          <p>{offer1.description}</p>
          <p>
            <span>Cijena: </span>{offer1.price} <span> KN</span>
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
      }

      {updateMode && <UpdateOffer offer={offer1} toggleUpdateMode={toggleUpdateMode} updateOffer={updateOffer} />}

      {auth.data.userId == authorId &&
        <div className="p-3 d-flex flex-row flex-sm-column">
          <Button variant="success" className="no-round m-2 text-uppercase">Prihvati</Button>
          <Button variant="danger" className="no-round m-2 text-uppercase">Odbij</Button>
        </div>
      }
      {!updateMode && auth.data.userId == offer.service.userId &&
        <div className="p-3 d-flex flex-row flex-sm-column">
          <Button onClick={toggleUpdateMode} variant="warning" className="no-round m-2 text-uppercase">
            <FontAwesomeIcon icon={faEdit} className=" bg-warning" />
          </Button>
          <Button onClick={handleOfferDelete} variant="danger" className="no-round m-2 text-uppercase">
            <FontAwesomeIcon icon={faTrashAlt} className=" bg-danger" />
          </Button>
        </div>
      }
    </div>
  );
}

export default OfferCard;