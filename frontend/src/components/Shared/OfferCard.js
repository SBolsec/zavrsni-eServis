import Button from "react-bootstrap/esm/Button";
import React, { useState } from "react";
import Moment from "react-moment";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../helpers/axiosInstance";
import { useHistory, Link } from "react-router-dom";
import UpdateOffer from "../ServiceDashboard/content/UpdateOffer";
import Card from "react-bootstrap/esm/Card";
import Chip from "@material-ui/core/Chip";
import Rating from "@material-ui/lab/Rating";

const OfferCard = ({ offer, authorId, margin, showService }) => {
  const { auth } = useAuth();
  const history = useHistory();
  const [updateMode, setUpdateMode] = useState(false);
  const [offer1, setOffer] = useState(offer);

  let rating = 0;
  if (offer.service && offer.service.reviews && offer.service.reviews.length !== 0) {
    let sumOfRatings = 0;
    offer.service.reviews.forEach((review) => (sumOfRatings += review.score));
    // round number to closes factor of 0.5
    rating = (Math.round((sumOfRatings / offer.service.reviews.length) * 2) / 2);
  }

  const toggleUpdateMode = () => {
    setUpdateMode(!updateMode);
  };

  const updateOffer = (newOffer) => {
    setOffer({
      ...offer1,
      ...newOffer,
    });
  };

  const handleOfferDelete = (e) => {
    if (window.confirm("Jeste li sigurni da želite obrisati ponudu?")) {
      axiosInstance(history)
        .delete(`/offers/${offer.id}`)
        .then((res) => {
          history.go(0); // refresh page
        })
        .catch((err) => {
          alert("Brisanje neuspješno! Greška na poslužitelju.");
          console.log(err);
        });
    }
  };

  const handleAcceptOffer = () => {
    if (window.confirm("Jeste li sigurni da želite prihvatiti ponudu?")) {
      axiosInstance(history)
        .post(`/offers/accept/${offer.id}`)
        .then((res) => {
          history.push(`/user/accepted`);
        })
        .catch((err) => {
          alert("Prihvaćanje neuspješno! Greška na poslužitelju.");
          console.log(err);
        });
    }
  };

  const handleDeclineOffer = () => {
    if (window.confirm("Jeste li sigurni da želite odbiti ponudu?")) {
      axiosInstance(history)
        .post(`/offers/decline/${offer.id}`)
        .then((res) => {
          history.go(0); // refresh page
        })
        .catch((err) => {
          alert("Odbijanje neuspješno! Greška na poslužitelju.");
          console.log(err);
        });
    }
  };

  return (
    <Card className={`no-round mb-0 ${margin ? margin : ""}`}>
      <Card.Body className="">
        {!updateMode && (
          <>
            <h5 className="font-weight-bold">{offer1.title}</h5>
            <p>{offer1.description}</p>
            <p className="my-1">
              <span className="text-gray text-uppercase">Cijena: </span>
              <span className="text-blueAccent font-weight-bold">
                {Math.round(Number(offer1.price * 100) / 100)
                  .toFixed(2)
                  .replace(".", ",")}{" "}
                kn
              </span>
            </p>
            <p className="my-1">
              <span className="text-gray text-uppercase">Datum objave: </span>
              <Moment format="DD.MM.YYYY">{offer.createdAt}</Moment>
            </p>
            {showService && offer.service.userId !== auth.data.userId && (
              <>
                <hr />
                <Link
                  to={`/${auth.data.role}/service/${offer.service.id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="d-flex align-items-center flex-wrap">
                    <img
                      src={offer.service.profilePicture.url}
                      alt="profilePicture"
                      className="rounded-circle ml-2"
                      style={{ width: "45px", height: "45px" }}
                    />
                    <span className="ml-2">{offer.service.name}</span>
                    <Rating
                      className="text-blueAccent ml-2"
                      defaultValue={rating}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </Link>
              </>
            )}
          </>
        )}

        {updateMode && (
          <UpdateOffer
            offer={offer1}
            toggleUpdateMode={toggleUpdateMode}
            updateOffer={updateOffer}
          />
        )}

        {(offer.statusId === 2 ||
          offer.statusId === 3 ||
          offer.statusId === 4) && (
          <>
            <hr />
            {offer.statusId === 2 && (
              <Chip
                label="Prihvaćena"
                className="bg-accepted text-white font-weight-bold"
              />
            )}
            {offer.statusId === 3 && (
              <Chip
                label="Odbijena"
                className="bg-declined text-white font-weight-bold"
              />
            )}
            {offer.statusId === 4 && (
              <Chip
                label="Uklonjena"
                className="bg-declined text-white font-weight-bold"
              />
            )}
          </>
        )}

        {offer.statusId !== 2 &&
          offer.statusId !== 3 &&
          offer.statusId !== 4 &&
          (auth.data.userId === authorId ||
            (!updateMode && auth.data.userId === offer.service.userId)) && (
            <>
              <hr />
              {auth.data.userId === authorId && (
                <>
                  <div className="d-flex justify-content-start">
                    <Button
                      onClick={handleDeclineOffer}
                      variant="white"
                      className="no-round mr-1 text-uppercase"
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="bg-thie text-blueAccent"
                      />
                    </Button>
                    <Button
                      onClick={handleAcceptOffer}
                      variant="white"
                      className="no-round ml-1 text-uppercase"
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="bg-thie text-blueAccent"
                      />
                    </Button>
                  </div>
                </>
              )}
              {!updateMode && auth.data.userId === offer.service.userId && (
                <div className="d-flex justify-content-start">
                  <Button
                    onClick={handleOfferDelete}
                    variant="white"
                    className="no-round mr-1 text-uppercase"
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="bg-white text-blueAccent"
                    />
                  </Button>
                  <Button
                    onClick={toggleUpdateMode}
                    variant="white"
                    className="no-round ml-1 text-uppercase"
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="bg-thie text-blueAccent"
                    />
                  </Button>
                </div>
              )}
            </>
          )}
      </Card.Body>
    </Card>
  );
};

export default OfferCard;
