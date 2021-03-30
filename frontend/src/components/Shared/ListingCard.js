import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ListingCard = ({ id, title, category, city, createdAt, picture }) => {
  return (
    <Link to={`/user/active/${id}`} className="text-decoration-none text-dark">
      <Container fluid className="mx-auto my-4">
        <Row>
          <Col md={3} className="mx-0 px-0">
            <img src={picture.url} alt={picture.name} className="h-100 w-100" />
          </Col>
          <Col md={9} className="pl-4 py-2 bg-white">
            <h4 className="mt-3">{title}</h4>
            <p><span className="text-gray" style={{ fontSize: '0.8em' }}>Kategorija: </span>{category}</p>
            <p><span className="text-gray" style={{ fontSize: '0.8em' }}>Mjesto: </span>{city}</p>
            <p>Objavljen: <Moment format="DD.MM.YYYY">{createdAt}</Moment></p>
          </Col>
        </Row>
      </Container>
    </Link>
  );
}

export default ListingCard;