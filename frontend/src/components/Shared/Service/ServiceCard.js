import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Card from "react-bootstrap/esm/Card";

const ServiceCard = ({ service }) => {
  const { auth } = useAuth();
  let type;
  switch (auth.data.role) {
    case 1:
      type = "admin";
      break;
    case 2:
      type = "user";
      break;
    case 3:
      type = "service";
      break;
    default:
      type = "user";
      break;
  }

  return (
    <Link
      to={`/${type}/service/${service.id}`}
      className="text-decoration-none text-dark"
    >
      <Card>
        {/* <Card.Header className="p-0 m-0 text-center">
          <img src={listing.pictures[0].url} alt={listing.pictures[0].name}
            className="img-fluid"
            style={{maxHeight: '50vh'}}
          />
        </Card.Header> */}
        <Card.Body>
          <Card.Title>{service.name}</Card.Title>
          <Card.Text>
            <p>
              <span className="text-gray" style={{ fontSize: "0.8em" }}>
                Adresa:
              </span>
              {service.address}
            </p>
            <p>
              <span className="text-gray" style={{ fontSize: "0.8em" }}>
                Mjesto:{" "}
              </span>
              {service.city.postalCode + " " + service.city.name}
            </p>
            <p>
              Račun stvoren:{" "}
              <Moment format="DD.MM.YYYY">{service.createdAt}</Moment>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ServiceCard;
