import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../../../contexts/AuthContext";
import SetProfilePicture from "../../Shared/SetProfilePicture";
import InfoCard from "../../Shared/InfoCard";
import { useServiceContext } from "../../../contexts/ServiceContext";
import AddFaultCategories from "./profile/AddFaultCategories";
import { Pie } from 'react-chartjs-2';
import axiosInstance from '../../../helpers/axiosInstance';
import { useHistory } from "react-router";
import Review from "../../Shared/Review";
import CardColumns from "react-bootstrap/esm/CardColumns";
import OfferCard from "../../Shared/OfferCard";
import ListingCard from "../../Shared/Listing/ListingCard";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    }
  },
};

const Dashboard = () => {
  const { auth } = useAuth();
  const { context } = useServiceContext();
  const history = useHistory();
  const [data, setData] = useState(false);

  useEffect(() => {
    if (context && context.data && context.data.id) {
      axiosInstance(history).get(`/services/data/${context.data.id}`)
        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [context.data.id]);

  return (
    <>
      <Container fluid className="my-2">
        <Row>
          <Col xs={12} lg={4} className="my-2">
            <InfoCard
              title={"Registrirajte se"}
              content={"Ispunite uslužne mogućnosti svoje tvrtke i kreirajte besplatni profil."}
              icon={"fas fa-pencil-alt"}
            />
          </Col>
          <Col xs={12} lg={4} className="my-2">
            <InfoCard
              title={"Pretražite oglase"}
              content={"Filtriranje Vam osigurava pronalazak oglasa sukladno uslužnim djelatnostima."}
              icon={"fab fa-searchengin"}
            />
          </Col>
          <Col xs={12} lg={4} className="my-2">
            <InfoCard
              title={"Servisirajte"}
              content={"Nakon dogovorenog posla, započnite s uslužnim djelatnostima."}
              icon={"fas fa-tools"}
            />
          </Col>
        </Row>
      </Container>

      {(!auth.data.profilePictureSet || context.data.faultCategories.length === 0) &&
        <Container fluid className="my-4">
          <Row>
            {!auth.data.profilePictureSet &&
              <Col md={6}>
                <div className="bg-white text-dark pt-4 text-uppercase font-weight-bold" >
                  <h5
                    className="text-dark text-uppercase py-0 my-0 mx-4 font-weight-bold"
                    style={{ fontSize: "1.1em" }}
                  >Promijenite sliku profila</h5>
                </div>
                <SetProfilePicture />
              </Col>
            }
            {context.data.faultCategories.length === 0 &&
              <Col md={6} className="d-flex">
                <div className="flex-grow-1 bg-white my-4 my-md-0">
                  <AddFaultCategories margin="" />
                </div>
              </Col>
            }
          </Row>
        </Container>
      }

      {data &&
        <>
          <Container fluid className="my-2">
            <Row>
              {data.pie.data.filter(d => d !== 0).length !== 0 &&
                <Col xs={12} md={4} className="my-2" >
                  <div
                    className="bg-white p-3 text-dark"
                    style={{ maxHeight: '350px', minHeight: '350px' }}
                  >
                    <h5 className="font-weight-bold text-uppercase">Vaše ponude</h5>
                    <div className="p-0 m-0 d-flex justify-content-center align-items-center">
                      <Pie
                        style={{ maxHeight: '350px', maxWidth: '350px', position: 'relative', top: '-20px' }}
                        data={{
                          labels: data.pie.labels,
                          datasets: [
                            {
                              label: '# of Votes',
                              data: data.pie.data,
                              backgroundColor: [
                                '#00a0d4',
                                '#3cc480',
                                '#f4666e',
                                '#626d71'
                              ],
                              borderColor: [
                                '#00a0d4',
                                '#3cc480',
                                '#f4666e',
                                '#626d71'
                              ],
                              borderWidth: 1,
                            },
                          ],
                        }} options={options}
                      />
                    </div>
                  </div>
                </Col>
              }

              <Col xs={12} md={8} className="my-2" >
                <div
                  className="bg-white p-3 text-dark overflow-auto"
                  style={{ maxHeight: '350px', minHeight: '350px' }}
                >
                  <h5 className="font-weight-bold text-uppercase">Najnovije recenzije</h5>
                  {data.reviews.map(review => (
                    <Review key={review.id} review={review} />
                  ))}
                </div>
              </Col>
            </Row>
          </Container>

          <Container fluid className="my-5">
            {data.offers.length > 0 && <h5 className="font-weight-bold text-uppercase">Vaše najnovije ponude</h5>}
            <CardColumns>
              {data.offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  authorId={0}
                  margin="my-2"
                  showService="false"
                />
              ))}
            </CardColumns>
          </Container>

          <Container>
            {data.recomendations.length > 0 && <h5 className="font-weight-bold text-uppercase">Predloženi oglasi za Vas</h5>}
            <CardColumns>
              {data.recomendations.map((listing, index) => (
                <ListingCard key={index} listing={listing} />
              ))}
            </CardColumns>
          </Container>
        </>
      }
    </>
  );
};

export default Dashboard;
