import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';
import Spinner from '../Utils/Spinner';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import Container from 'react-bootstrap/esm/Container';
import CardColumns from 'react-bootstrap/esm/CardColumns';
import Moment from 'react-moment';
import Button from 'react-bootstrap/esm/Button';
import { useAuth } from '../../contexts/AuthContext';
import OfferCard from './OfferCard';

const ListingDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { auth } = useAuth();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axiosInstance(history).get(`/listings/id/${id}`)
      .then(res => {
        setLoading(false);
        setError('');
        console.log(res);
        setListing(res.data);
      })
      .catch(err => {
        setLoading(true);
        setError(true);
        console.log(err);
      });
  }, []);

  if (loading || !listing) {
    return (
      <div className="d-flex justify-content-center p-5 m-5">
        <Spinner className="my-auto mx-auto" />
      </div>
    );
  }

  if (error) {
    return { error }
  }

  return (
    <Container className="my-4 p-0">
      {/* https://github.com/yifaneye/react-gallery-carousel */}
      <Container className="bg-white text-black p-0">
        <Carousel
          images={listing.pictures.map(img => ({ src: img.url, alt: img.alt }))}
          isLoop={true}
          transitionDurationLimit={350}
          isAutoPlaying={false}
          hasMediaButton={false}
          hasMediaButtonAtMax={false}
          shouldMaximizeOnClick={true}
          shouldMinimizeOnClick={true}
          objectFit="contain"
          style={{ maxHeight: '90vh' }}
        />

        <h3 className="px-4 pt-4">{listing.title}</h3>
        <p className="px-4 pb-4 text-gray">
          <span style={{ fontSize: '0.8em' }}>
            Kategorija: </span>{listing.faultCategory.parent.name + " - " + listing.faultCategory.name}
        </p>
      </Container>

      <Container className="bg-white text-black my-4 pt-4 pb-3">
        <h5>Opis oglasa</h5>
        <pre style={{ fontSize: '1em' }}>{listing.description}</pre>
        <hr />
        <p>
          <span className="text-gray" style={{ fontSize: '0.8em' }}>Mjesto: </span>
          {listing.city.postalCode + " " + listing.city.name}
        </p>
        <p>
          <span className="text-gray" style={{ fontSize: '0.8em' }}>Objavljen: </span>
          <Moment format="DD.MM.YYYY">{listing.createdAt}</Moment>
        </p>
      </Container>


      {auth.data.userId != listing.person.userId &&
        <Container className="bg-white text-black my-4 pt-4 pb-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div>
              <img src={listing.person.profilePicture.url} alt="profilePicture" className="rounded-circle ml-2" style={{ width: '45px', height: '45px' }} />
              <span className="ml-2">{listing.person.firstName + " " + listing.person.lastName}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center my-4">
              {/* <span className="mx-2 align-self-center">Svi oglasi ovog oglašivača</span> */}
              <Button
                variant="blueAccent"
                className="no-round mx-2"
              >
                Posalji poruku
          </Button>
            </div>
          </div>
        </Container>}

      <Container className="bg-white text-black my-4 py-4">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
          <h5>Ponude</h5>
          {auth.data.role === 3 && listing.offers.filter(offer => offer.service.userId == auth.data.userId).length === 0 &&
            <Link to={`/service/create/${listing.id}`}>
              <Button variant="blueAccent" className="no-round my-2">Kreiraj ponudu</Button>
            </Link>
          }
        </div>

        {listing.offers.length === 0 && <span className="ml-2 text-gray">Oglas još nema ponuda.</span>}

        <CardColumns>
          {listing.offers.map((offer, index) => (
            <OfferCard key={index} offer={offer} authorId={listing.person.userId} margin="m-2" />
          ))}
        </CardColumns>

      </Container>
    </Container>
  );
}

export default ListingDetails;