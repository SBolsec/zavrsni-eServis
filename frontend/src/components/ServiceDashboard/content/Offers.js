import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../helpers/axiosInstance';
import { useHistory } from 'react-router-dom';
import OfferCard from '../../Shared/OfferCard';
import Spinner from '../../Utils/Spinner';
import { useServiceContext } from '../../../contexts/ServiceContext';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardColumns from 'react-bootstrap/esm/CardColumns';
import ListingInfo from '../../Shared/Listing/ListingInfo';

const OffersHistory = ({link, message}) => {
  const history = useHistory();
  const { context } = useServiceContext();
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchListings(0);
  }, [])

  const handlePageChange = (page) => {
    fetchListings(page - 1);
  }

  const fetchListings = (page) => {
    axiosInstance(history).get(`/offers/${link}/${context.data.id}?per_page=10&page=${page}`)
      .then(res => {
        setLoading(false);
        setError(false);
        setData(res.data);
        document.getElementById("top").scrollIntoView({ behavior: "smooth" });
      })
      .catch(err => {
        setLoading(false);
        setError('Neuspješno dohvaćanje oglasa');
        console.log(err);
      });
  }

  if (loading) {
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
    <Container id="top">
      {data && data.data.length === 0 &&
        <div className="text-center py-5 my-5">
          <p>{message}</p>
          <p>Pretražite oglase, napravite novu ponudu!</p>
          <Button variant="blueAccent" className="no-border-radius">
            <Link to="/service/search" className="text-white text-uppercase" style={{ textDecoration: 'none' }}>Pretražite oglase</Link>
          </Button>
        </div>
      }
      {data && data.data.map((offer, index) => (
        <Row key={index} noGutters className="align-items-center my-4 bg-white">
          <Col xs={12} className="">
            <OfferCard offer={offer} authorId={context.data.id} />
          </Col>
          <Col xs={12} className="bg-lightGray">
            <Accordion className="no-round bg-lightGray">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                Oglas
              </AccordionSummary>

              <AccordionDetails className="py-0">
                <ListingInfo listing={offer.listing} />
              </AccordionDetails>
            </Accordion>
          </Col>

          <Col xs={12} className="mt-0 py-0">
            <Accordion className="no-round bg-lightGray">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                Ponude ostalih servisera
              </AccordionSummary>

              <AccordionDetails>
                {offer.listing.offers.length === 0 ? <p>Nema drugih ponuda!</p> :
                  <CardColumns className="mx-auto">
                    {offer.listing.offers.map((o, i) => (
                      <OfferCard key={i} offer={o} authorId={offer.listing.personId} margin="m-2" />
                    ))}
                  </CardColumns>
                }
              </AccordionDetails>
            </Accordion>
          </Col>
        </Row>
      ))}

      {data && data.data.length !== 0 &&
        <div className="text-center">
          <Pagination
            className="d-inline-block my-4"
            count={data.total_pages}
            onChange={(_, page) => handlePageChange(page)}
            showFirstButton showLastButton
          />
        </div>
      }
    </Container>
  );
}

export default OffersHistory;