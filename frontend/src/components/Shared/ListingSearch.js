import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/esm/Alert';
import Container from 'react-bootstrap/esm/Container';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import axiosInstance from "../../helpers/axiosInstance";
import Spinner from '../Utils/Spinner';
import SearchIcon from '@material-ui/icons/Search';
import ListingCard from './ListingCard';

const validationSchema = yup.object({
  listing: yup.string(),
  faultCategoryId: yup.number(),
  cityId: yup.number(),
  per_page: yup.number()
});

const ListingSearch = () => {
  const history = useHistory();
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // fetch cities, categories and initial search results
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
      cityId: '',
      per_page: 10,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetchListings(values, 0)
    }
  });

  const handlePageChange = (page) => {
    fetchListings(formik.values, page - 1);
  }

  const fetchListings = (values, page) => {
    let query = "";
    if (values.listing) query += `listing=${values.listing}`;
    if (values.faultCategoryId) query += `&faultCategoryId=${values.faultCategoryId}`;
    if (values.cityId) query += `&cityId=${values.cityId}`;
    if (values.per_page) query += `&per_page=${values.per_page}`;
    if (page) query += `&page=${page}`
    setLoading(true);
    axiosInstance(history).get("/listings/search?" + query)
      .then(res => {
        setLoading(false);
        setError(false);
        setData(res.data);
        document.getElementById("listings").scrollIntoView({ behavior: "smooth" });
      })
      .catch(err => {
        setLoading(false);
        setError('Neuspješno dohvaćanje oglasa');
        console.log(err);
      })
  }

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
          <FormControl>
            <InputLabel htmlFor="per_page">Broj oglasa po stranici</InputLabel>
            <Select
              className="my-2 mr-sm-2 h-100"
              id="per_page"
              name="per_page"
              label="Broj oglasa po stranici"
              defaultValue={10}
              displayEmpty={true}
              value={formik.values.per_page}
              onChange={formik.handleChange}
              error={
                formik.touched.per_page && Boolean(formik.errors.per_page)
              }
              helperText={
                formik.touched.per_page && formik.errors.per_page
              }
              variant="outlined"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10} selected={true}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
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

      <Container id="listings" className="p-2 my-2 text-black">
        {data && data.data.map((listing, index) => (
          <ListingCard key={index} listing={listing} />
        ))}
        {data &&
          <div className="text-center">
            <Pagination
              className="d-inline-block"
              count={data.total_pages}
              onChange={(_, page) => handlePageChange(page)}
              showFirstButton showLastButton
            />
          </div>}
      </Container>
    </>
  );
}

export default ListingSearch;