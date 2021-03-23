import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-white text-dark pt-3 pb-3 px-4">
        <div>
          <h5 className="text-uppercase">Kako do odgovarajuće usluge servisa?</h5>
          <p>Zaprimite ponude u nekoliko klikova. Uštedite vrijeme i novac uz manje napora.</p>
        </div>
        <Button variant="blueAccent" className="no-border-radius">
          <Link to="#" className="text-white text-uppercase" style={{ textDecoration: 'none' }}>Kreiraj oglas</Link>
        </Button>
      </div>

      <Container fluid className="my-4" >
        <Row className="row-eq-height">
          <Col xs={12} lg={4} className="my-2" >
            <div className="bg-white text-dark p-3 d-flex justify-content-between h-100">
              <div>
                <h5 className="font-weight-bold text-uppercase">Kreiraj oglas</h5>
                <p>Ispunite obrazac, opišite projekt te priložite slike.</p>
              </div>
              <div className="d-flex align-items-center">
                <span className="fas fa-stack fa-2x">
                  <i className="fas fa-circle fa-stack-2x text-lightBlue"></i>
                  <i className="fas fa-plus fa-stack-1x text-blueAccent"></i>
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={4} className="my-2" >
            <div className="bg-white text-dark p-3 d-flex justify-content-between h-100">
              <div>
                <h5 className="font-weight-bold text-uppercase">Objavi oglas</h5>
                <p>Mehanizam će obavijestiti odgovarajuće servisere koji imaju mogućnost otkloniti Vaš kvar.</p>
              </div>
              <div className="d-flex align-items-center">
                <span className="fas fa-stack fa-2x">
                  <i className="fas fa-circle fa-stack-2x text-lightBlue"></i>
                  <i className="fas fa-upload fa-stack-1x text-blueAccent"></i>
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={4} className="my-2" >
            <div className="bg-white text-dark p-3 d-flex justify-content-between h-100">
              <div>
                <h5 className="font-weight-bold text-uppercase">Odaberi ponudu</h5>
                <p>Prihvatite sebi adekvatnu ponudu i krenite u posao.</p>
              </div>
              <div className="d-flex align-items-center">
                <span className="fas fa-stack fa-2x">
                  <i className="fas fa-circle fa-stack-2x text-lightBlue"></i>
                  <i className="fas fa-mouse-pointer fa-stack-1x text-blueAccent"></i>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;