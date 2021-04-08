import { Button, InputAdornment, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/esm/Alert';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from "../../helpers/axiosInstance";
import Spinner from '../Utils/Spinner';
import SearchIcon from '@material-ui/icons/Search';
import ListingCard from './ListingCard';

const validationSchema = yup.object({
  listing: yup.string(),
  faultCategoryId: yup.number(),
  cityId: yup.number()
});

const ListingSearch = () => {
  const history = useHistory();
  const { auth } = useAuth();
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // fetch cities and categories
  useEffect(() => {
    axiosInstance(history)
      .get("/faultCategories/formatted")
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        setError('Neuspješno dohvaćanje kategorija kvarova')
        console.log(err)
      });

    axiosInstance(history)
      .get("/cities/formatted")
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => {
        setError('Neuspješno dohvaćanje mjesta')
        console.log(err);
      });

    setLoading(true);
    axiosInstance(history).get("/listings/search")
      .then(res => {
        setLoading(false);
        setError(false);
        setData(res.data);
      })
      .catch(err => {
        setLoading(false);
        setError('Neuspješno dohvaćanje oglasa');
        console.log(err);
      })
  }, []);

  const formik = useFormik({
    initialValues: {
      listing: '',
      faultCategoryId: '',
      cityId: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let query = "";
      if (values.listing) query += `listing=${values.listing}`;
      if (values.faultCategoryId) query += `&faultCategoryId=${values.faultCategoryId}`;
      if (values.cityId) query += `&cityId=${values.cityId}`;
      setLoading(true);
      axiosInstance(history).get("/listings/search?" + query)
        .then(res => {
          setLoading(false);
          setError(false);
          setData(res.data);
        })
        .catch(err => {
          setLoading(false);
          setError('Neuspješno dohvaćanje oglasa');
          console.log(err);
        })
    }
  });

  return (
    <>
      <Container fluid className="p-2 bg-white text-black">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className="my-2 mr-sm-2 h-100"
            id="listing"
            name="listing"
            label="Pretražite aktivne oglase"
            value={formik.values.listing}
            onChange={formik.handleChange}
            error={
              formik.touched.listing && Boolean(formik.errors.listing)
            }
            helperText={
              formik.touched.listing && formik.errors.listing
            }
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <Autocomplete
            id="faultCategoryId"
            name="faultCategoryId"
            options={categories}
            groupBy={(option) => option.parentname}
            getOptionLabel={(option) => option.name}
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
          <Autocomplete
            id="cityId"
            name="cityId"
            options={cities}
            getOptionLabel={(option) => option.city}
            className="my-2"
            onChange={(_, value) =>
              formik.setFieldValue("cityId", value ? value.id : "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                name="cityId"
                variant="outlined"
                label="Mjesto"
                error={formik.touched.cityId && Boolean(formik.errors.cityId)}
                helperText={formik.touched.cityId && formik.errors.cityId}
              />
            )}
          />
          {!loading &&
            <>
              <Button
                variant="contained"
                type="submit"
                className="my-2 px-4 bg-blueAccent text-white no-round font-weight-bold"
              >
                Traži
              </Button>
              <Button
                variant="contained"
                type="reset"
                className="my-2 px-4 bg-blueAccent text-white no-round font-weight-bold"
                onClick={formik.resetForm}
              >
                Reset
              </Button>
            </>
          }
          {loading && <Spinner />}
        </form>
      </Container>

      <Container>
        {error &&
          <Alert className="w-100" variant="danger" onClick={() => { setError(false) }
          } dismissible>
            {error}
          </Alert>
        }
      </Container>

      <Container className="p-2 my-2 text-black">
        {data && data.data.map((listing, index) => (
          <ListingCard key={index} listing={listing} type="user" />
        ))}
      </Container>
    </>
  );
}

export default ListingSearch;