import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Card from "react-bootstrap/esm/Card";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";

const ServiceCard = ({ service }) => {
  const { auth } = useAuth();

  let rating = 0;
  if (service.reviews.length !== 0) {
    let sumOfRatings = 0;
    service.reviews.forEach(review => sumOfRatings += review.score);
    // round number to closes factor of 0.5
    rating = (Math.round((sumOfRatings / service.reviews.length) * 2) / 2);
  }

  return (
    <Link
      to={`/${auth.data.role}/service/${service.id}`}
      className="text-decoration-none text-dark"
    >
      <Card className="no-round">
        <Card.Body>
          <div className="d-flex justify-content-start align-items-center my-2">
            <img
              src={service.profilePicture.url}
              alt="company"
              className="rounded-circle mr-4"
              style={{
                width: "75px",
                height: "75px",
                border: "1px solid lightGray",
              }}
            />
            <h5>{service.name}</h5>
          </div>

          <hr />

          <p className="text-gray text-uppercase mb-0">Mjesto:</p>
          <p className="mt-0">
            {service.city.postalCode + " " + service.city.name}
          </p>

          {service.faultCategories.length !== 0 && (
            <>
              <p className="text-gray text-uppercase mb-0">Kategorije:</p>
              <div className="mt-0 d-flex flex-wrap align-items-center">
                {service.faultCategories.map((c, index) => (
                  <Chip
                    key={index}
                    label={c.name}
                    className="bg-blueAccent text-white font-weight-bold m-1"
                  />
                ))}
              </div>
            </>
          )}

          {service.description && (
            <>
              <p className="text-gray text-uppercase mb-0 mt-4">
                Opis djelatnosti:
              </p>
              <p className="mt-0">{service.description}</p>
            </>
          )}

          <hr />

          <div className="text-center">
            <Rating
              className="text-blueAccent"
              defaultValue={rating}
              precision={0.5}
              readOnly
            />
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ServiceCard;
