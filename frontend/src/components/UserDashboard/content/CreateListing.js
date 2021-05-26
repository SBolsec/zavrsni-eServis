import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/esm/Alert';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { useAuth } from '../../../contexts/AuthContext';
import { useUserContext } from '../../../contexts/UserContext';
import axiosInstance from "../../../helpers/axiosInstance";
import Spinner from '../../Utils/Spinner';
import './CreateListing.css';
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const validationSchema = yup.object({
  title: yup
    .string()
    .min(1, "Naslov oglasa ne smije biti prazan")
    .required("Obavezno je ispuniti naslov oglasa"),
  description: yup
    .string()
    .min(1, "Opis oglasa je obavezan")
    .required("Obevezno je ispuniti opis oglasa"),
  faultCategoryId: yup
    .number()
    .required("Obavezno je odabrati kategoriju kvara oglasa"),
  cityId: yup
    .number()
    .required("Obavezno je odabrati mjesto"),
  pictures: yup
    .array()
    .min(1, "Potreno je odabrati barem jednu sliku")
    .max(10, "Dopušteno je odabrati najviše 10 slika")
    .required("Potrebno je odabrati slike oglasa")
});

const CreateListing = () => {
  const history = useHistory();
  const { auth } = useAuth();
  const { context } = useUserContext();
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState([]);

  // fetch cities and categories
  useEffect(() => {
    axiosInstance(history)
      .get("/faultCategories/formatted")
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.log(err)
      });

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
      title: '',
      description: '',
      faultCategoryId: '',
      cityId: '',
      pictures: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setError(false);

      axiosInstance(history).post('/listings', {
        ...values,
        personId: context.data.id
      })
        .then(res => {
          let formData = new FormData();
          for (let picture of values.pictures) {
            formData.append("pictures[]", picture);
          }
          axiosInstance(history).post(`/listings/upload-pictures/${res.data.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }).then(response => {
            setLoading(false);
            setError(false);
            history.push(`/user/listing/${res.data.id}`);
          })
            .catch(e => {
              setLoading(false);
              setError('Greška kod uploadanja slika');
              console.log(e);
            });
        })
        .catch(err => {
          setLoading(false);
          setError('Greška kod stvaranja oglasa');
          console.log(err);
        })
    }
  });

  const setPictures = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
    formik.setFieldValue("pictures", [...formik.values.pictures, ...files]);

    let p = preview;
    Array.from(files).forEach(file => {
      let reader = new FileReader();
      reader.onloadend = () => {
        p = [...p, reader.result];
        setPreview(p);
      }
      reader.readAsDataURL(file);
    });
  }

  const deletePicture = (index) => {
    setPreview(preview.filter((f, i) => i !== index));
    formik.setFieldValue("pictures", formik.values.pictures.filter((f, i) => i !== index));
  }

  return (
    <Container className="my-3">
      <div className="bg-white text-dark p-4">
        <h5 className="text-uppercase font-weight-bold">Stvori novi oglas</h5>

        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col xs={12}>
              <TextField
                className="my-2 mr-sm-2"
                fullWidth
                id="title"
                name="title"
                label="Naslov oglasa"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={
                  formik.touched.title && Boolean(formik.errors.title)
                }
                helperText={
                  formik.touched.title && formik.errors.title
                }
                variant="outlined"
              />
            </Col>
            <Col xs={12}>
              <TextField
                className="my-2 mr-sm-2 h-100"
                fullWidth
                multiline
                rows={5}
                id="description"
                name="description"
                label="Opis oglasa"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description && Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                variant="outlined"
              />
            </Col>
            <Col md={6}>
              <Autocomplete
                id="faultCategoryId"
                name="faultCategoryId"
                options={categories}
                groupBy={(option) => option.parent.name}
                getOptionLabel={(option) => option.name}
                fullWidth
                className="my-2"
                onChange={(_, value) =>
                  formik.setFieldValue("faultCategoryId", value ? value.id : "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="faultCategoryId"
                    variant="outlined"
                    label="Kategorija kvara"
                    error={formik.touched.faultCategoryId && Boolean(formik.errors.faultCategoryId)}
                    helperText={formik.touched.faultCategoryId && formik.errors.faultCategoryId}
                  />
                )}
              />
            </Col>
            <Col md={6}>
              <Autocomplete
                id="cityId"
                name="cityId"
                options={cities}
                getOptionLabel={(option) => option.city}
                fullWidth
                className="my-2"
                onChange={(_, value) =>
                  formik.setFieldValue("cityId", value ? value.id : "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="cityId"
                    variant="outlined"
                    defaultValue={context.data.cityName}
                    label="Mjesto"
                    error={formik.touched.cityId && Boolean(formik.errors.cityId)}
                    helperText={formik.touched.cityId && formik.errors.cityId}
                  />
                )}
              />
            </Col>
            <Col xs={12}>
              <div className="w-100 my-2 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                <Button
                  variat="contained"
                  size="small"
                  className="bg-lightGray text-dark no-round font-weight-bold m-2 px-4 text-center"
                  component="label"
                >
                  Odaberi slike
                    <input
                    type="file"
                    id="picture"
                    name="picture"
                    accept="image/*"
                    onChange={setPictures}
                    multiple
                    hidden
                  />
                </Button>
              </div>
              <div className="w-100 text-danger text-center">
                {formik.touched.pictures && formik.errors.pictures}
              </div>
              <div>
                {preview.map((picture, index) => (
                  <div key={index}
                    className="position-relative d-inline-block m-2"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  >
                    <img
                      src={picture}
                      alt="slika"
                      className="m-2  img-thumbnail"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                      <FontAwesomeIcon icon={faTimes} 
                        className="img-preview text-danger fa-2x position-absolute" 
                        style={{ zIndex: 1, right: 0, top: 0 }} 
                        onClick={() => deletePicture(index)}
                      />
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={12}>
              <div className="px-4 my-2 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                {!loading &&
                  <>
                    <Button
                      variant="contained"
                      type="submit"
                      className="m-2 px-4 bg-blueAccent text-white no-round font-weight-bold"
                    >
                      Stvori oglas
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
            </Col>
          </Row>
        </form>
      </div>
    </Container>
  );
}

export default CreateListing;