import { Button, TextField } from "@material-ui/core";
import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useAuth } from "../../../../contexts/AuthContext";
import { useUserContext } from "../../../../contexts/UserContext";

const ShowProfileInfo = ({ enableEdit }) => {
  const { auth } = useAuth();
  const { context } = useUserContext();

  return (
    <Container className="my-3">
      <Row>
        <Col lg={6} className="bg-white">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="text-dark text-uppercase my-4 font-weight-bold align-self-start"
              style={{fontSize: '1.1em'}}
            >
              Informacije o računu
            </h5>
            <div className="my-4">
              <img
                src={auth.data.profilePictureURL}
                alt="avatar"
                className="rounded-circle ml-2"
                style={{ width: "90px", height: "90px" }}
              />
            </div>
            <div className="w-100 d-flex flex-column flex-sm-row justify-content-evenly align-items-center">
              <TextField
                className="my-2 mr-sm-2"
                fullWidth
                id="firstName"
                name="firstName"
                label="Ime"
                value={context.data.firstName}
                variant="outlined"
                disabled={true}
              />
              <TextField
                className="my-2 ml-sm-2"
                fullWidth
                id="lastName"
                name="lastName"
                label="Prezime"
                value={context.data.lastName}
                variant="outlined"
                disabled={true}
              />
            </div>
            <TextField
              className="my-2"
              fullWidth
              id="email"
              name="email"
              label="E-mail"
              value={auth.data.email}
              variant="outlined"
              disabled={true}
            />
            <TextField
              className="my-2"
              fullWidth
              id="password"
              name="password"
              label="Lozinka"
              value=""
              variant="outlined"
              disabled={true}
            />

            <Button
              variant="contained"
              className="my-4 px-4 bg-blueAccent text-white no-round font-weight-bold"
              onClick={() => enableEdit()}
            >
              Uredi
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowProfileInfo;
