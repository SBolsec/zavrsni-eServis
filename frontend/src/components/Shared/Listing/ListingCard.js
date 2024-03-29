import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Card from 'react-bootstrap/esm/Card';

const ListingCard = ({ listing }) => {
  const { auth } = useAuth();

  // sort pictures so that the same one is used as the preview
  listing.pictures.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

  return (
    <Link to={`/${auth.data.role}/listing/${listing.id}`} className="text-decoration-none text-dark">
      <Card >
        <Card.Header className="p-0 m-0 text-center">
          <img src={listing.pictures[0].url} alt={listing.pictures[0].name}
            className="img-fluid"
            style={{maxHeight: '50vh'}}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>{listing.title}</Card.Title>
          <Card.Text>
            <p>
              <span className="text-gray" style={{ fontSize: '0.8em' }}>
                Kategorija: </span>{listing.faultCategory.parent.name + " - " + listing.faultCategory.name}
            </p>
            <p>
              <span className="text-gray" style={{ fontSize: '0.8em' }}>Mjesto: </span>
              {listing.city.postalCode + " " + listing.city.name}
            </p>
            <p>
              Objavljen: <Moment format="DD.MM.YYYY">{listing.createdAt}</Moment>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ListingCard;