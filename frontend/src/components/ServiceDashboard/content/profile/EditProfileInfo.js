import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useAuth } from "../../../../contexts/AuthContext";
import { useServiceContext } from "../../../../contexts/ServiceContext";
import * as yup from "yup";
import { useFormik } from "formik";
import axiosInstance from "../../../../helpers/axiosInstance";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SetProfilePicture from '../../../Shared/SetProfilePicture';
import { LOGIN_SUCCESS, SERVICE_DATA_SUCCESS } from "../../../../constants/actionTypes";
import Spinner from "../../../Utils/Spinner";

const validationSchema = yup.object({
  name: yup
    .string("Unesite naziv tvtrke")
    .min(1, "Naziv tvrtke ne smije biti prazno")
    .required("Obavezno je ispuniti naziv tvrtke"),
  oib: yup
    .string("Unesite OIB tvrtke")
    .min(1, "OIB tvrtke ne smije biti prazan")
    .required("Obavezno je ispuniti OIB tvrtke"),
  phone: yup
    .string("Unesite broj telefona")
    .min(1, "Broj telefona new smije biti prazan")
    .required("Obavezno je ispuniti broj broj telefona"),
  website: yup.string("Unesite web lokaciju tvrtke").nullable(),
  description: yup.string("Unesite opis tvrtke").nullable(),
  address: yup
    .string("Unesite adresu tvrtke")
    .min(1, "Adresa tvrtke ne smije biti prazna")
    .required("Obavezno je ispuniti adresu tvrtke"),
  cityId: yup
    .number("Unesite grad tvrtke")
    .required("Obavezno je ispuniti grad tvrtke"),
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
  const history = useHistory();
  const { auth, dispatch: authDispatch } = useAuth();
  const { context, dispatch: serviceDispatch } = useServiceContext();
  const [cities, setCities] = useState([]); // id, city
  const [loading, setLoading] = useState(false);

  // fetch cities
  useEffect(() => {
    axiosInstance(history)
      .get("/cities/formatted")
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: context.data.name,
      oib: context.data.oib,
      address: context.data.oib,
      cityId: context.data.cityId,
      phone: context.data.phone,
      website: context.data.website,
      description: context.data.description,
      email: auth.data.email,
      currentPassword: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axiosInstance().put(`/services/${context.data.id}`, {
        ...values,
        userId: auth.data.userId
      })
        .then(res => {
          setLoading(false);
          authDispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.user
          });
          serviceDispatch({
            type: SERVICE_DATA_SUCCESS,
            payload: res.data.service
          });
          disableEdit();
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
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
                Informacije o tvrtci
              </h5>
              
              <SetProfilePicture />
              
              <TextField
                className="my-2 mr-sm-2"
                fullWidth
                id="name"
                name="name"
                label="Naziv tvrtke"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="outlined"
              />
              <TextField
                className="my-2 mr-sm-2"
                fullWidth
                id="oib"
                name="oib"
                label="OIB tvrtke"
                value={formik.values.oib}
                onChange={formik.handleChange}
                error={formik.touched.oib && Boolean(formik.errors.oib)}
                helperText={formik.touched.oib && formik.errors.oib}
                variant="outlined"
              />
              <div className="w-100 d-flex flex-column flex-sm-row justify-content-evenly align-items-center">
                <TextField
                  className="my-2 mr-sm-2"
                  fullWidth
                  id="address"
                  name="address"
                  label="Adresa tvrtke"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                  variant="outlined"
                />
                <Autocomplete
                  id="cityId"
                  name="cityId"
                  options={cities}
                  defaultValue={{id: context.data.cityId, city: context.data.cityName}}
                  getOptionLabel={(option) => option.city}
                  fullWidth
                  className="my-2 ml-sm-2"
                  onChange={(_, value) =>
                    formik.setFieldValue("cityId", value ? value.id : "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="cityId"
                      variant="outlined"
                      defaultValue={context.data.cityName}
                      label="Mjesto tvrtke"
                      error={formik.touched.cityId && Boolean(formik.errors.cityId)}
                      helperText={formik.touched.cityId && formik.errors.cityId}
                    />
                  )}
                />
              </div>
              <TextField
                className="my-2"
                fullWidth
                id="phone"
                name="phone"
                label="Broj telefona"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                variant="outlined"
              />
              <TextField
                className="my-2"
                fullWidth
                id="website"
                name="website"
                label="Web lokacija"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
                variant="outlined"
              />
              <TextField
                className="my-2"
                fullWidth
                id="description"
                name="description"
                label="Opis"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                variant="outlined"
                multiline={true}
              />
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
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfileInfo;
