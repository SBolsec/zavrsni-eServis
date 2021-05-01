import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosInstance from "../../../helpers/axiosInstance";
import Spinner from "../../Utils/Spinner";
import "react-gallery-carousel/dist/index.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../../../contexts/AuthContext";
import OfferCard from "../OfferCard";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import Review from "../Review";
import { TextField } from "@material-ui/core";

const ServiceDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { auth } = useAuth();
  const [service, setService] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axiosInstance(history)
      .get(`/services/id/${id}`)
      .then((res) => {
        setLoading(false);
        setError("");
        setService(res.data);
      })
      .catch((err) => {
        setLoading(true);
        setError(true);
        console.log(err);
      });
  }, []);

  const [rating, setRating] = useState(0);
  if (service && service.reviews.length !== 0) {
    let sumOfRatings = 0;
    service.reviews.forEach((review) => (sumOfRatings += review.score));
    // round number to closes factor of 0.5
    setRating(Math.round((sumOfRatings / service.reviews.length) * 2) / 2);
  }

  if (loading || !service) {
    return (
      <div className="d-flex justify-content-center p-5 m-5">
        <Spinner className="my-auto mx-auto" />
      </div>
    );
  }

  if (error) {
    return { error };
  }

  return (
    <>
      <Container className="my-4 p-0">
        <Row>
          <Col xs={12} md={7} className="bg-white text-black">
            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
              <img
                src={service.profilePicture.url}
                alt="company picture"
                className="rounded-circle my-2"
                style={{
                  height: "75px",
                  width: "75px",
                  border: "1px solid lightGray",
                }}
              />
              <h5 className="text-black">{service.name}</h5>
              <Rating
                className="text-blueAccent"
                defaultValue={rating}
                precision={0.5}
                readOnly
              />
            </div>

            <hr className="my-4" />

            <h5 className="text-uppercase text-gray mb-3">
              Informacije o servisu
            </h5>

            <p>
              <span className="text-uppercase text-gray">OIB: </span>
              {service.oib}
            </p>
            <p>
              <span className="text-uppercase text-gray">Adresa: </span>
              {service.address}
            </p>
            <p>
              <span className="text-uppercase text-gray">Mjesto: </span>
              {service.city.postalCode + " " + service.city.name}
            </p>
            <p>
              <span className="text-uppercase text-gray">Telefon: </span>
              {service.phone}
            </p>
            <p>
              <span className="text-uppercase text-gray">Web lokacija: </span>
              {service.website}
            </p>
            <span className="text-uppercase text-gray">Opis djelatnosti:</span>
            <pre>{service.description}</pre>

            <hr className="my-4" />

            {service.faultCategories.length !== 0 && (
              <>
                <p className="text-gray text-uppercase mb-0">Kategorije:</p>
                <div className="mt-0 d-flex flex-wrap align-items-center">
                  {service.faultCategories.map((c, index) => (
                    <Chip
                      key={index}
                      label={c.parent.name + " - " + c.name}
                      className="bg-accepted text-white font-weight-bold"
                    />
                  ))}
                </div>
              </>
            )}
          </Col>
          <Col xs={12} md={5} className="bg-white text-black">
            <h5 className="text-uppercase text-gray my-4">Recenzije</h5>

            <div>
              <TextField fullWidth label="Komentiraj..." variant="outlined" />
              <div className="my-2 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center flex-wrap">
                  <span className="text-gray">Ocjena: </span>
                  <Rating
                    className="text-blueAccent"
                    defaultValue={rating}
                    precision={0.5}
                  />
                </div>
                <Button
                  variant="blueAccent"
                  className="button-round text-uppercase"
                >
                  Podijeli
                </Button>
              </div>
            </div>

            <div className="d-flex flex-column flex-grow-1 justify-content-center ">
              {service.reviews.map((review, index) => (
                <Review key={index} review={review} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="p-0 text-black">
        <h5 className="text-uppercase my-4 mx-0 px-0">
          Prikaz dosadašnjih ponuda servisa
        </h5>
      </Container>

      {service.offers.map((offer, index) => (
        <Container key={index} className="bg-white text-black p-0">
          <OfferCard offer={offer} authorId={0} showService={false} />
        </Container>
      ))}
    </>
  );
};

export default ServiceDetails;
