import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@material-ui/core';
import Button from 'react-bootstrap/esm/Button';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import Alert from 'react-bootstrap/esm/Alert';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useServiceContext } from '../../../contexts/ServiceContext';
import axiosInstance from "../../../helpers/axiosInstance";
import Spinner from '../../Utils/Spinner';

const validationSchema = yup.object({
  title: yup
    .string()
    .min(1, "Naslov oglasa ne smije biti prazan")
    .required("Obavezno je ispuniti naslov oglasa"),
  description: yup
    .string()
    .min(1, "Opis oglasa je obavezan")
    .required("Obevezno je ispuniti opis oglasa"),
  price: yup
    .number("Cijena mora biti broj")
    .required("Obavezno je staviti cijenu")
});

const UpdateOffer = ({ offer, toggleUpdateMode, updateOffer }) => {
  const history = useHistory();
  const { id } = useParams();
  const { context } = useServiceContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      title: offer.title,
      description: offer.description,
      price: offer.price
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setError(false);

      axiosInstance(history).put(`/offers/${offer.id}`, {
        ...values,
        serviceId: context.data.id,
        listingId: id
      })
        .then(res => {
          setLoading(false);
          setError(false);
          updateOffer(values);
          toggleUpdateMode();
        })
        .catch(e => {
          setLoading(false);
          setError('Greška kod ažuriranja oglasa na poslužitelju');
          console.log(e);
        });
    }
  });

  return (
    <Container>
      <div className="bg-white text-dark">
        <h5 className="text-uppercase font-weight-bold">Ažuriraj ponudu</h5>

        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col xs={12} className="m-0 p-0">
              <TextField
                className="my-2 mr-sm-2"
                fullWidth
                id="title"
                name="title"
                label="Naslov ponude"
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
            <Col xs={12} className="m-0 p-0">
              <TextField
                className="my-2 mr-sm-2 h-100"
                fullWidth
                multiline
                rows={5}
                id="description"
                name="description"
                label="Opis ponude"
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
            <Col xs={12} className="m-0 p-0">
              <TextField
                className="my-2 mr-sm-2 h-100"
                fullWidth
                type="number"
                id="price"
                name="price"
                label="Cijena u kunama"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={
                  formik.touched.price && Boolean(formik.errors.price)
                }
                helperText={
                  formik.touched.price && formik.errors.price
                }
                variant="outlined"
              />
            </Col>

            <Col xs={12}>
              <div className="px-4 my-2 d-flex justify-content-center align-items-center">
                {!loading &&
                  <>
                    <Button
                      variant="white" className="no-round mx-4 text-uppercase"
                      type="submit"
                      onClick={toggleUpdateMode}
                    >
                      <FontAwesomeIcon icon={faUndo} className="bg-white text-blueAccent fa-1x" />
                   </Button>
                    <Button
                      variant="white" className="no-round mx-4 text-uppercase"
                      type="submit"
                    >
                      <FontAwesomeIcon icon={faSave} className="bg-white text-blueAccent fa-1x" />
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

export default UpdateOffer;