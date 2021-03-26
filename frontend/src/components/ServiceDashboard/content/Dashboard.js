import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../../../contexts/AuthContext';
import SetProfilePicture from '../../Shared/SetProfilePicture';

const Dashboard = () => {
  const { auth } = useAuth();

  return (
    <>
      <Container fluid className="my-2" >
        <Row>
          <Col xs={12} lg={4} className="my-2" >
            <div className="bg-white text-dark p-3 d-flex justify-content-between h-100">
              <div>
                <h5 className="font-weight-bold text-uppercase">Registrirajte se</h5>
                <p>Ispunite uslužne mogućnosti svoje tvrtke i kreirajte besplatni profil.</p>
              </div>
              <div className="d-flex align-items-center">
                <span className="fas fa-stack fa-2x">
                  <i className="fas fa-circle fa-stack-2x text-lightBlue"></i>
                  <i className="fas fa-pencil-alt fa-stack-1x text-blueAccent"></i>
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={4} className="my-2" >
            <div className="bg-white text-dark p-3 d-flex justify-content-between h-100">
              <div>
                <h5 className="font-weight-bold text-uppercase">Pretražite oglase</h5>
                <p>Filtriranje Vam osigurava pronalazak oglasa sukladno uslužnim djelatnostima.</p>
              </div>
              <div className="d-flex align-items-center">
                <span className="fas fa-stack fa-2x">
                  <i className="fas fa-circle fa-stack-2x text-lightBlue"></i>
                  <i className="fab fa-searchengin fa-stack-1x text-blueAccent"></i>
                </span>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={4} className="my-2" >
            <div className="bg-white text-dark p-3 d-flex justify-content-between h-100">
              <div>
                <h5 className="font-weight-bold text-uppercase">Servisirajte</h5>
                <p>Nakon dogovorenog posla, započnite s uslužnim djelatnostima.</p>
              </div>
              <div className="d-flex align-items-center">
                <span className="fas fa-stack fa-2x">
                  <i className="fas fa-circle fa-stack-2x text-lightBlue"></i>
                  <i className="fas fa-tools fa-stack-1x text-blueAccent"></i>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {!auth.data.profilePictureSet && <SetProfilePicture />}
    </>
  );
}

export default Dashboard;