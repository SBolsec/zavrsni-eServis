import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './Auth.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import signupUser from '../../actions/signup/signupUser';
import { REGISTER_AFTER_REDIRECT, REGISTER_ERROR_REMOVE } from '../../constants/actionTypes';
import Spinner from '../Utils/Spinner';
import Alert from 'react-bootstrap/esm/Alert';

const validationSchema = yup.object({
    firstName: yup
        .string('Unesite svoje ime')
        .min(1, 'Ime ne smije biti prazno')
        .required('Obavezno je ispuniti ime'),
    lastName: yup
        .string('Unesite svoje prezime')
        .min(1, 'Prezime ne smije biti prazno')
        .required('Obavezno je ispuniti prezime'),
    email: yup
        .string('Unesite svoju email adresu')
        .email('Unesite ispravnu email adresu')
        .required('Obavezno je ispuniti email adresu'),
    password: yup
        .string('Unesite lozinku')
        .min(8, 'Lozinka mora imati barem 8 znakova')
        .required('Obavezno je ispuniti lozinku'),
});

const SignupUser = () => {
    const history = useHistory();
    const { auth: { loading, error, data }, dispatch } = useAuth();

    useEffect(() => {
        if (data) {
            if (data.success) {
                dispatch({ type: REGISTER_AFTER_REDIRECT });
                history.push('/login');
            }
        }
    }, [data]);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            signupUser(values)(dispatch);
        },
    });

    return (
        <Container fluid className="px-0">
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
                        <p className="my-2 font-weight-bold">Ispunite podatke da biste kreirali račun.</p>

                        {error &&
                            <Alert variant="danger" onClick={() => {
                                console.log('click');
                                dispatch({ type: REGISTER_ERROR_REMOVE })
                            }
                            } dismissible>
                                {error.message}
                            </Alert>
                        }

                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                className="my-2"
                                fullWidth
                                variant="outlined"
                                id="firstName"
                                name="firstName"
                                label="Ime"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                            <TextField
                                className="my-2"
                                fullWidth
                                variant="outlined"
                                id="lastName"
                                name="lastName"
                                label="Prezime"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
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

                            {!loading &&
                                <Button variant="contained" type="submit" className="my-2 bg-blueAccent text-white button-round">
                                    Kreiraj račun
                                </Button>
                            }
                            {loading &&
                                <Spinner />
                            }

                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignupUser;
