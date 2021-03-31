import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing, type }) => {
  return (
    <Link to={`/${type}/listing/${listing.id}`} className="text-decoration-none text-dark">
      <Container fluid className="mx-auto my-4">
        <Row>
          <Col md={3} className="mx-0 px-0">
          <div className="w-100 h-100">
            <img src={listing.pictures[0].url} alt={listing.pictures[0].name}  
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
          </Col>
          <Col md={9} className="pl-4 py-2 bg-white">
            <h4 className="mt-3">{listing.title}</h4>
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
          </Col>
        </Row>
      </Container>
    </Link>
  );
}

export default ListingCard;