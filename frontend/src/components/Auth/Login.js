import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import './Auth.css';
import { Link } from 'react-router-dom';
import login from '../../actions/auth/login';
import { AuthContext } from '../../contexts/AuthContext';
import redirectToDashboard from '../../utils/redirectToDashboard';
import { LOGIN_ERROR_REMOVE } from '../../constants/actionTypes';
import Spinner from '../Utils/Spinner';

const validationSchema = yup.object({
  email: yup
    .string('Unesite svoju email adresu')
    .email('Unesite ispravnu email adresu')
    .required('Obavezno je ispuniti email adresu'),
  password: yup
    .string('Unesite lozinku')
    .min(1, 'Lozinka mora imati barem 8 znakova')
    .required('Obavezno je ispuniti lozinku'),
});

const Login = () => {
  const { auth, dispatch } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values)(dispatch);
      return redirectToDashboard(auth);
    },
  });

  return (
    <>
      <Container fluid className="px-0 body-wrapper">
        <Row noGutters>
          <Col sm={6} className="px-0 d-none d-sm-block">
            <img src="/images/korisnik_registracija.jpg" alt="signup" className="login-img" />
          </Col>
          <Col sm={6} className="login-section-wrapper">
            <div className="login-wrapper my-auto mx-auto text-center">
              <div className="brand-wrapper">
                <Link to="/">
                  <img src="/images/logo.svg" alt="logo" className="logo" />
                </Link>
              </div>
              <p className="my-2 font-weight-bold">Dobrodošli natrag! Molimo prijavite se na svoj račun.</p>

              {auth.error &&
                <Alert variant="danger" onClick={() => {
                  console.log('click');
                  dispatch({ type: LOGIN_ERROR_REMOVE })
                }
                } dismissible>
                  {auth.error}
                </Alert>
              }

              <form onSubmit={formik.handleSubmit}>
                <TextField
                  className="my-2"
                  fullWidth
                  variant="outlined"
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  className="my-2"
                  fullWidth
                  variant="outlined"
                  id="password"
                  name="password"
                  label="Lozinka"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />

                {!auth.loading &&
                  <Button variant="contained" type="submit" className="my-2 bg-blueAccent text-white button-round">
                    Prijava
                                    </Button>
                }
                {auth.loading &&
                  <Spinner />
                }

              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
