import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosInstance from "../../../helpers/axiosInstance";
import Spinner from "../../Utils/Spinner";
import "react-gallery-carousel/dist/index.css";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../../../contexts/AuthContext";
import OfferCard from "../OfferCard";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Review from "../Review";
import { TextField } from "@material-ui/core";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ROLE_USER } from '../../../constants/global';

const validationSchema = yup.object({
  content: yup
    .string('Unesite recenziju')
    .required('Unesite recenziju'),
  score: yup
    .number('Odaberite ocjenu')
    .required('Obavezno je odabrati ocjenu'),
});

const ServiceDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { auth } = useAuth();
  const [service, setService] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    axiosInstance(history)
      .get(`/services/id/${id}`)
      .then((res) => {
        setLoading(false);
        setError("");
        res.data.reviews.sort((a, b) => {
          if (a.author.userId === auth.data.userId)
            return -1;
          if (b.author.userId === auth.data.userId)
            return 1;
          return 0;
        })
        setService(res.data);
      })
      .catch((err) => {
        setLoading(true);
        setError(true);
        console.log(err);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      content: '',
      score: 5,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoadingReview(true);
      axiosInstance(history)
        .post(`/reviews/`, {
          content: values.content,
          score: values.score,
          serviceId: id
        })
        .then((res) => {
          setLoadingReview(false);
          setService({
            ...service,
            reviews: [res.data, ...service.reviews]
          });
        })
        .catch((err) => {
          setLoadingReview(false);
          console.log(err);
        });
    },
  });

  const updateReview = (review) => {
    axiosInstance(history)
      .put(`/reviews/${review.id}`, {
        content: review.content,
        score: review.score,
        serviceId: review.serviceId
      })
      .then((res) => {
        setService({
          ...service,
          reviews: [res.data, ...service.reviews.filter(r => r.id !== review.id)]
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteReview = (review) => {
    if (window.confirm("Jeste li sigurni da želite obrisati recenziju?")) {
      axiosInstance(history)
        .delete(`/reviews/${review.id}`)
        .then((res) => {
          setService({
            ...service,
            reviews: [...service.reviews.filter(r => r.id !== review.id)]
          });
        })
        .catch((err) => {
          alert("Brisanje neuspješno! Greška na poslužitelju.");
          console.log(err);
        });
    }
  }

  let rating = 0;
  if (service && service.reviews.length !== 0) {
    let sumOfRatings = 0;
    service.reviews.forEach((review) => (sumOfRatings += review.score));
    // round number to closes factor of 0.5
    rating = (Math.round((sumOfRatings / service.reviews.length) * 2) / 2);
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
          <div className="bg-white text-black p-4" id="information">
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
                value={rating}
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
            <p>{service.description}</p>

            {service.faultCategories.length !== 0 && (
              <>
                <hr className="my-4" />
                <p className="text-gray text-uppercase mb-0">Kategorije:</p>
                <div className="mt-0 d-flex flex-wrap align-items-center">
                  {service.faultCategories.map((c, index) => (
                    <Chip
                      key={index}
                      label={!c.parent ? c.name : c.parent.name + " - " + c.name}
                      className="bg-blueAccent m-1 text-white font-weight-bold"
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

            <div 
              className="flex-grow-1"
              style={{ height: `320px`, overflow: 'auto' }}
            >
              {service.reviews.length === 0 &&
                <div>
                  <p>Još nema recenzija.</p>
                  {auth.data.role === ROLE_USER &&
                    <p>Budi prvi koji će objaviti svoje dojmove!</p>
                  }
                </div>
              }
              {service.reviews.map((review) => (
                <>
                  <Review key={review.id} review={review} updateReview={updateReview} deleteReview={deleteReview} />
                  <hr />
                </>
              ))}
            </div>

            {auth.data.role === ROLE_USER && service.reviews.filter(r => r.author.userId === auth.data.userId).length === 0 &&
              <div className="">
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    className="mt-2 mb-1"
                    fullWidth
                    variant="outlined"
                    id="content"
                    name="content"
                    label="Komentiraj..."
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    helperText={formik.touched.content && formik.errors.content}
                  />
                  <div className="my-1 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center flex-wrap">
                      <span className="text-gray mb-1">Ocjena: </span>
                      <Rating
                        className="text-blueAccent"
                        fullWidth
                        variant="outlined"
                        id="score"
                        name="score"
                        value={formik.values.score}
                        onChange={(_, value) => formik.setFieldValue('score', value ? value : 1)}
                        error={formik.touched.score && Boolean(formik.errors.score)}
                        helperText={formik.touched.score && formik.errors.score}
                        precision={1}
                      />
                    </div>
                    {!loadingReview &&
                      <Button variant="contained" type="submit" className="my-2 bg-blueAccent text-white button-round text-uppercase">
                        Podijeli
                      </Button>
                    }
                    {loadingReview &&
                      <Spinner />
                    }
                  </div>
                </form>
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
