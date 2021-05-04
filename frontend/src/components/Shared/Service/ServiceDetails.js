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
import Grid from "@material-ui/core/Grid";
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
    <Container>
      <Grid container className="my-2 p-0" spacing={6}>
        <Grid item xs={12} md={7} className="m-0">
          <div className="bg-white text-black p-4">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                src={service.profilePicture.url}
                alt="company"
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
          </div>
        </Grid>
        <Grid item xs={12} md={5} >
          <div className="bg-white text-black p-4 h-100 d-flex flex-column">
            <h5 className="text-uppercase text-gray mb-4">Recenzije</h5>

            <div className="flex-grow-1">
              {service.reviews.length === 0 &&
                <div>
                  <p>Još nema recenzija.</p>
                  {auth.data.role === 2 &&
                    <p>Budi prvi koji će objaviti svoje dojmove!</p>
                  }
                </div>
              }
              {service.reviews.map((review, index) => (
                <Review key={index} review={review} />
              ))}
            </div>

            {auth.data.role === 2 &&
              <div className="">
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
            }
          </div>
        </Grid>
      </Grid>

      <Container className="p-0 text-black">
        <h5 className="text-uppercase my-4 mx-0 px-0">
          Dosadašnje ponude servisera
        </h5>
        {service.offers.length === 0 &&
          <p>Još nema ponuda.</p>
        }
      </Container>

      {service.offers.map((offer, index) => (
        <Container key={index} className="bg-white text-black p-0 mb-4">
          <OfferCard offer={offer} authorId={0} showService={false} />
        </Container>
      ))}
    </Container>
  );
};

export default ServiceDetails;
