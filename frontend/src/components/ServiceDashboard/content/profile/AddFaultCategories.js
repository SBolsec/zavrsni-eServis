import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/esm/Alert';
import Container from 'react-bootstrap/esm/Container';
import { useHistory } from 'react-router';
import * as yup from "yup";
import axiosInstance from "../../../../helpers/axiosInstance";
import Spinner from '../../../Utils/Spinner';
import { useServiceContext } from '../../../../contexts/ServiceContext';
import updateFaultCategories from '../../../../actions/service/updateFaultCategories';

const validationSchema = yup.object({
  faultCategories: yup.array()
});

const AddFaultCategories = ({margin}) => {
  const history = useHistory();
  const { context, dispatch } = useServiceContext();
  const [allFaultCategories, setAllFaultCategories] = useState([]);


  // fetch all fault categories
  useEffect(() => {
    axiosInstance(history)
      .get("/faultCategories/formatted")
      .then((res) => {
        setAllFaultCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      faultCategories: context.data.faultCategories
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateFaultCategories({faultCategories: values.faultCategories})(dispatch);
    }
  });

  return (
    <Container fluid className={`bg-white ${margin ? margin : ""}`}>
      <form onSubmit={formik.handleSubmit}>
        <h5
          className="text-dark text-uppercase py-4 font-weight-bold"
          style={{ fontSize: "1.1em" }}
        >
          Kategorije kvarova
        </h5>

        <Autocomplete
          multiple
          id="faultCategories"
          name="faultCategories"
          value={formik.faultCategories}
          options={allFaultCategories}
          groupBy={(option) => option.parent.name}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => value.id === option.id}
          defaultValue={context.data.faultCategories}
          fullWidth
          className=""
          onChange={(_, value) =>
            formik.setFieldValue("faultCategories", value)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              name="cityId"
              variant="outlined"
              fullWidth
              label="Kategorije kvarova"
              error={formik.touched.cityId && Boolean(formik.errors.cityId)}
              helperText={formik.touched.cityId && formik.errors.cityId}
            />
          )}
        />

        <div className="w-100 py-3 px-4 d-flex flex-column flex-sm-row justify-content-center align-items-center">
          {!context.loadingFault && <>
            <Button
              variant="contained"
              type="submit"
              className="m-2 px-4 bg-blueAccent text-white no-round font-weight-bold"
            >
              Spremi Promjene
                  </Button>
          </>}
          {context.loadingFault && <Spinner />}
        </div>
        {context.errorFault &&
          <Alert className="w-100" variant="danger" dismissible>
            {context.errorFault}
          </Alert>
        }
      </form>
    </Container>
  );
}

export default AddFaultCategories;