import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useAuth } from "../../../../contexts/AuthContext";
import { useUserContext } from "../../../../contexts/UserContext";
import * as yup from "yup";
import { useFormik } from "formik";
import SetProfilePicture from "../../../Shared/SetProfilePicture";
import axiosInstance from '../../../../helpers/axiosInstance';
import { LOGIN_SUCCESS, USER_DATA_SUCCESS } from "../../../../constants/actionTypes";
import Spinner from "../../../Utils/Spinner";
import Alert from 'react-bootstrap/Alert';

const validationSchema = yup.object({
  firstName: yup
    .string("Unesite ime")
    .min(1, "Ime ne smije biti prazno")
    .required("Obavezno je ispuniti ime"),
  lastName: yup
    .string("Unesite prezime")
    .min(1, "Prezime ne smije biti prazno")
    .required("Obavezno je ispuniti prezime"),
  email: yup
    .string("Unesite svoju email adresu")
    .email("Unesite ispravnu email adresu")
    .required("Obavezno je ispuniti email adresu"),
  currentPassword: yup
    .string("Unesite trenutnu lozinku")
    .min(8, "Trenutna lozinka mora imati barem 8 znakova")
    .test("cp1", "Potrebo je unijeti trenutnu lozinku", function (value) {
      if (this.parent.repeatPassword || this.parent.password) {
        return Boolean(value);
      }
      return true;
    }),
  password: yup
    .string("Unesite novu lozinku")
    .min(8, "Nova lozinka mora imati barem 8 znakova")
    .test("p1", "Potrebno je unijeti novu lozinku", function (value) {
      if (this.parent.currentPassword || this.parent.repeatPassword) {
        return Boolean(value);
      }
      return true;
    }),
  repeatPassword: yup
    .string()
    .test("rp1", "Lozinke se moraju podudarati", function (value) {
      if (this.parent.currentPassword) {
        if (this.parent.password) {
          return this.parent.password === value;
        } else {
          return false;
        }
      }
      return this.parent.password === value;
    }),
});

const EditProfileInfo = ({ disableEdit }) => {
  const { auth, dispatch: authDispatch } = useAuth();
  const { context, dispatch: userDispatch } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: context.data.firstName,
      lastName: context.data.lastName,
      email: auth.data.email,
      currentPassword: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setError(false);
      axiosInstance().put(`/people/${context.data.id}`, {
        ...values,
        userId: auth.data.userId
      })
        .then(res => {
          setLoading(false);
          setError(false);
          authDispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.user
          });
          userDispatch({
            type: USER_DATA_SUCCESS,
            payload: res.data.person
          });
          disableEdit();
        })
        .catch(err => {
          setLoading(false);
          setError(err.response.data.message);
        })
    },
  });

  return (
    <Container fluid className="my-3">
      <Row>
        <Col lg={6} className="bg-white">
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h5
                className="text-dark text-uppercase my-4 font-weight-bold align-self-start"
                style={{ fontSize: "1.1em" }}
              >
                Informacije o računu
              </h5>

              <SetProfilePicture />

              <div className="w-100 d-flex flex-column flex-sm-row justify-content-evenly align-items-center">
                <TextField
                  className="my-2 mr-sm-2"
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="Ime"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  variant="outlined"
                />
                <TextField
                  className="my-2 ml-sm-2"
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Prezime"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  variant="outlined"
                />
              </div>
              <TextField
                className="my-2"
                fullWidth
                id="email"
                name="email"
                label="E-mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
              />

              <h5
                className="text-dark text-uppercase font-weight-bold align-self-start mt-4 mb-2"
                style={{ fontSize: "1.1em" }}
              >
                Promijeni lozinku
              </h5>

              <TextField
                className="my-2"
                fullWidth
                type="password"
                id="currentPassword"
                name="currentPassword"
                label="Trenutna lozinka"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
                variant="outlined"
              />
              <TextField
                className="my-2"
                fullWidth
                type="password"
                id="password"
                name="password"
                label="Nova lozinka"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
              />
              <TextField
                className="my-2"
                fullWidth
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                label="Potvrdi lozinku"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.repeatPassword &&
                  Boolean(formik.errors.repeatPassword)
                }
                helperText={
                  formik.touched.repeatPassword && formik.errors.repeatPassword
                }
                variant="outlined"
              />

              <div className="w-100 px-4 mb-4 mt-2 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                {!loading && <>
                  <Button
                    variant="contained"
                    className="w-100 m-2 px-4 bg-lightGray text-dark no-round font-weight-bold"
                    onClick={() => disableEdit()}
                  >
                    Odustani
                </Button>

                  <Button
                    variant="contained"
                    type="submit"
                    className="w-100 m-2 px-4 bg-blueAccent text-white no-round font-weight-bold"
                  >
                    Spremi Promjene
                </Button>
                </>}
                {loading && <Spinner />}
              </div>
              {error &&
                <Alert className="w-100" variant="danger" onClick={() => { setError(false) }
                } dismissible>
                  {error}
                </Alert>
              }
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfileInfo;
