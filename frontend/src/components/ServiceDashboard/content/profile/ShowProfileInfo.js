import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useAuth } from "../../../../contexts/AuthContext";
import { useServiceContext } from "../../../../contexts/ServiceContext";

const ShowProfileInfo = ({ enableEdit }) => {
  const { auth } = useAuth();
  const { context } = useServiceContext();

  return (
    <Container fluid className="my-3">
      <Row>
        <Col lg={6} className="bg-white">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="text-dark text-uppercase my-4 font-weight-bold align-self-start"
              style={{fontSize: '1.1em'}}
            >
              Informacije o tvrtci
            </h5>
            <div className="my-4">
              <img
                src={auth.data.profilePictureURL}
                alt="avatar"
                className="rounded-circle ml-2"
                style={{ width: "90px", height: "90px" }}
              />
            </div>
            <TextField
                className="my-2 mr-sm-2"
                fullWidth
                id="name"
                name="name"
                label="Naziv tvrtke"
                value={context.data.name}
                variant="outlined"
                disabled={true}
              />
              <TextField
                className="my-2 mr-sm-2"
                fullWidth
                id="oib"
                name="oib"
                label="OIB tvrtke"
                value={context.data.oib}
                variant="outlined"
                disabled={true}
              />
            <div className="w-100 d-flex flex-column flex-sm-row justify-content-evenly align-items-center">
              <TextField
                className="my-2 mr-sm-2"
                fullWidth
                id="address"
                name="address"
                label="Adresa tvrtke"
                value={context.data.address}
                variant="outlined"
                disabled={true}
              />
              <TextField
                className="my-2 ml-sm-2"
                fullWidth
                id="city"
                name="city"
                label="Mjesto tvrtke"
                value={context.data.cityName}
                variant="outlined"
                disabled={true}
              />
            </div>
            <TextField
              className="my-2"
              fullWidth
              id="phone"
              name="phone"
              label="Broj telefona"
              value={context.data.phone}
              variant="outlined"
              disabled={true}
            />
            <TextField
              className="my-2"
              fullWidth
              id="website"
              name="website"
              label="Web lokacija"
              value={context.data.website}
              variant="outlined"
              disabled={true}
            />
            <TextField
              className="my-2"
              fullWidth
              id="description"
              name="description"
              label="Opis"
              value={context.data.description}
              variant="outlined"
              disabled={true}
              multiline={true}
            />
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
