import Button from 'react-bootstrap/esm/Button';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../helpers/axiosInstance';
import { useHistory } from 'react-router-dom';
import UpdateOffer from '../ServiceDashboard/content/UpdateOffer';
import Card from 'react-bootstrap/esm/Card';

const OfferCard = ({ offer, authorId }) => {
  const { auth } = useAuth();
  const history = useHistory();
  const [updateMode, setUpdateMode] = useState(false);
  const [offer1, setOffer] = useState(offer);
  console.log(history.location);

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
    <Card className="no-round mb-0">
      <Card.Body className="">
        {!updateMode &&
          <>
            <h5>{offer1.title}</h5>
            <p>{offer1.description}</p>
            <p>
              <span>Cijena: </span>{offer1.price} <span> KN</span>
            </p>
            <p>
              <span className="text-gray" style={{ fontSize: '0.8em' }}>Objavljen: </span>
              <Moment format="DD.MM.YYYY">{offer.createdAt}</Moment>
            </p>
            {(history.location.pathname != '/service/active' || offer.service.userId !== auth.data.userId) && <>
              <hr />
              <div>
                <img src={offer.service.profilePicture.url} alt="profilePicture" className="rounded-circle ml-2" style={{ width: '45px', height: '45px' }} />
                <span className="ml-2">{offer.service.name}</span>
                <span className="ml-2 text-gray"> TODO: zvijezdice od recenzija</span>
              </div>
            </>}
          </>
        }

        {updateMode && <UpdateOffer offer={offer1} toggleUpdateMode={toggleUpdateMode} updateOffer={updateOffer} />}

      </Card.Body>

      {((auth.data.userId == authorId) || (!updateMode && auth.data.userId == offer.service.userId)) &&
        <Card.Footer>
          {auth.data.userId == authorId &&
            <div className="d-flex flex-sm-column">
              <Button variant="success" className="no-round m-2 text-uppercase">Prihvati</Button>
              <Button variant="danger" className="no-round m-2 text-uppercase">Odbij</Button>
            </div>
          }
          {!updateMode && auth.data.userId == offer.service.userId &&
            <div className="d-flex justify-content-center">
              <Button onClick={handleOfferDelete} variant="danger" className="no-round mx-4 text-uppercase">
                <FontAwesomeIcon icon={faTrashAlt} className=" bg-danger" />
              </Button>
              <Button onClick={toggleUpdateMode} variant="warning" className="no-round mx-4 text-uppercase">
                <FontAwesomeIcon icon={faEdit} className=" bg-warning" />
              </Button>
            </div>
          }
        </Card.Footer>
      }
    </Card>
  );
}

export default OfferCard;