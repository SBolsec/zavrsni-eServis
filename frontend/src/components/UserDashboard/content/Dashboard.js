import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import SetProfilePicture from '../../Shared/SetProfilePicture';
import InfoCard from '../../Shared/InfoCard';

const Dashboard = () => {
  const { auth } = useAuth();

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

      {/* Replace this with something more generic */}
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
    </>
  );
}

export default Dashboard;