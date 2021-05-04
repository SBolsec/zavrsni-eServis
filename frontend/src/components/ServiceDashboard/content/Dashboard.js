import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../../../contexts/AuthContext";
import SetProfilePicture from "../../Shared/SetProfilePicture";
import InfoCard from "../../Shared/InfoCard";
import { useServiceContext } from "../../../contexts/ServiceContext";
import AddFaultCategories from "./profile/AddFaultCategories";

const Dashboard = () => {
  const { auth } = useAuth();
  const { context, dispatch } = useServiceContext();

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
    </>
  );
};

export default Dashboard;
