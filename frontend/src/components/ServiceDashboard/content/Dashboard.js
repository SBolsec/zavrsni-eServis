import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../../../contexts/AuthContext";
import SetProfilePicture from "../../Shared/SetProfilePicture";
import InfoCard from "../../Shared/InfoCard";

const Dashboard = () => {
  const { auth } = useAuth();

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
};

export default Dashboard;
