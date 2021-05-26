import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useUserContext } from '../../../contexts/UserContext';
import SetProfilePicture from '../../Shared/SetProfilePicture';
import InfoCard from '../../Shared/InfoCard';
import axiosInstance from '../../../helpers/axiosInstance';
import Counter from '../../Utils/Counter/Counter';

const Dashboard = () => {
  const { auth } = useAuth();
  const { context } = useUserContext();
  const history = useHistory();
  const [data, setData] = useState(false);

  useEffect(() => {
    if (context && context.data && context.data.id) {
      axiosInstance(history).get(`/people/data/${context.data.id}`)
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
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-white text-dark pt-3 pb-3 px-4">
        <div>
          <h5 className="text-uppercase">Kako do odgovarajuće usluge servisa?</h5>
          <p>Zaprimite ponude u nekoliko klikova. Uštedite vrijeme i novac uz manje napora.</p>
        </div>
        <Button variant="blueAccent" className="no-border-radius">
          <Link to="/user/create" className="text-white text-uppercase" style={{ textDecoration: 'none' }}>Kreiraj oglas</Link>
        </Button>
      </div>

      <Container fluid className="my-4" >
        <Row className="row-eq-height">
          <Col xs={12} lg={4} className="my-2" >
            <InfoCard
              title={"Kreiraj oglas"}
              content={"Ispunite obrazac, opišite projekt te priložite slike."}
              icon={"fas fa-plus"}
            />
          </Col>
          <Col xs={12} lg={4} className="my-2" >
            <InfoCard
              title={"Objavi oglas"}
              content={"Mehanizam će obavijestiti odgovarajuće servisere koji imaju mogućnost otkloniti Vaš kvar."}
              icon={"fas fa-upload"}
            />
          </Col>
          <Col xs={12} lg={4} className="my-2" >
            <InfoCard
              title={"Odaberi ponudu"}
              content={"Prihvatite sebi adekvatnu ponudu i krenite u posao."}
              icon={"fas fa-mouse-pointer"}
            />
          </Col>
        </Row>
      </Container>

      {!auth.data.profilePictureSet &&
        <Container fluid className="my-4">
          <Row>
            <Col md={6}>
              {!auth.data.profilePictureSet &&
                <div>
                  <div className="bg-white text-dark text-center pt-4 text-uppercase font-weight-bold" >Promijenite sliku profila</div>
                  <SetProfilePicture />
                </div>}
            </Col>
          </Row>
        </Container>
      }

      {data &&
        <Container fluid className="mt-2 mb-5">
          <Row className="px-3" >
            <Col xs={6} md={4} lg={2} className="bg-white text-dark text-center d-flex flex-column justify-content-center align-items-center">
              <Counter start={0} end={data.receivedOffers} style={{ fontSize: '2.5em', fontWeight: 'bold' }} />
              <p className="text-uppercase" style={{ fontSize: '0.9em' }} >Dobivenih ponuda</p>
            </Col>
            <Col xs={6} md={4} lg={2} className="bg-white text-dark text-center d-flex flex-column justify-content-center align-items-center">
              <Counter start={0} end={data.acceptedOffers} style={{ fontSize: '2.5em', fontWeight: 'bold' }} />
              <p className="text-uppercase" style={{ fontSize: '0.9em' }}>Dobivenih ponuda</p>
            </Col>
            <Col xs={6} md={4} lg={2} className="bg-white text-dark text-center d-flex flex-column justify-content-center align-items-center">
              <Counter start={0} end={data.declineOffers} style={{ fontSize: '2.5em', fontWeight: 'bold' }} />
              <p className="text-uppercase" style={{ fontSize: '0.9em' }}>Dobivenih ponuda</p>
            </Col>
            <Col xs={6} md={4} lg={2} className="bg-white text-dark text-center d-flex flex-column justify-content-center align-items-center">
              <Counter start={0} end={data.activeListings} style={{ fontSize: '2.5em', fontWeight: 'bold' }} />
              <p className="text-uppercase" style={{ fontSize: '0.9em' }}>Dobivenih ponuda</p>
            </Col>
            <Col xs={6} md={4} lg={2} className="bg-white text-dark text-center d-flex flex-column justify-content-center align-items-center">
              <Counter start={0} end={data.finishedListings} style={{ fontSize: '2.5em', fontWeight: 'bold' }} />
              <p className="text-uppercase" style={{ fontSize: '0.9em' }}>Dobivenih ponuda</p>
            </Col>
            <Col xs={6} md={4} lg={2} className="bg-white text-dark text-center d-flex flex-column justify-content-center align-items-center">
              <Counter start={0} end={data.numOfReviews} style={{ fontSize: '2.5em', fontWeight: 'bold' }} />
              <p className="text-uppercase" style={{ fontSize: '0.9em' }}>Dobivenih ponuda</p>
            </Col>
          </Row>
        </Container>
      }
    </>
  );
}

export default Dashboard;