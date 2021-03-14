import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './Auth.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import signupService from '../../actions/signup/signupService';
import { REGISTER_AFTER_REDIRECT, REGISTER_ERROR_REMOVE } from '../../constants/actionTypes';
import Alert from 'react-bootstrap/esm/Alert';
import Spinner from '../Utils/Spinner';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axiosInstance from '../../helpers/axiosInstance';

const validationSchema = yup.object({
    companyName: yup
        .string('Unesite naziv tvrtke')
        .min(1, 'Naziv tvrtke ne smije biti prazan')
        .required('Obavezno je ispuniti naziv tvrtke'),
    oib: yup
        .string('OIB tvrtke mora biti broj')
        .matches(/[0-9]{11}/, 'OIB tvrtke mora sadržavati točno 11 znamenka')
        .required('Obavezno je ispuniti OIB tvrtke'),
    address: yup
        .string('Unesite adresu tvrtke')
        .min(1, 'Adresa tvrtke ne smije biti prazna')
        .required('Obavezno je ispuniti adresu tvrtke'),
    city: yup
        .number('Unesite grad tvrtke')
        .required('Obavezno je ispuniti grad tvrtke'),
    phone: yup
        .string('Broj telefona tvrtke mora biti broj')
        .min(6, 'Broj telefona tvrtke mora sadržavati 6 znamenka')
        .max(11, 'Broj telefona tvrtke ne smije biit veći od 11 znamenka')
        .required('Obavezno je ispuniti broj telefona tvrtke'),
    email: yup
        .string('Unesite email adresu tvrtke')
        .email('Unesite ispravnu email adresu')
        .required('Obavezno je ispuniti email adresu tvrtke'),
    password: yup
        .string('Unesite lozinku')
        .min(8, 'Lozinka mora imati barem 8 znakova')
        .required('Obavezno je ispuniti lozinku'),
});

const SignupService = () => {
    const history = useHistory();
    const { auth: { loading, error, data }, dispatch } = useAuth();
    const [cities, setCities] = useState([]); // id, city

    useEffect(() => {
        axiosInstance(history).get('/city')
            .then(res => {
                setCities(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

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
            companyName: '',
            oib: '',
            address: '',
            city: '',
            phone: '',
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            signupService(values)(dispatch);
        },
    });

    return (
        <Container fluid className="px-0">
            <Row noGutters>
                <Col sm={6} className="px-0 d-none d-sm-block">
                    <img src="/images/servis_registracija.jpg" alt="signup" className="login-img" />
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
                                size="small"
                                variant="outlined"
                                id="companyName"
                                name="companyName"
                                label="Naziv tvrtke"
                                value={formik.values.companyName}
                                onChange={formik.handleChange}
                                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                helperText={formik.touched.companyName && formik.errors.companyName}
                            />
                            <TextField
                                className="my-2"
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="oib"
                                name="oib"
                                label="OIB"
                                value={formik.values.oib}
                                onChange={formik.handleChange}
                                error={formik.touched.oib && Boolean(formik.errors.oib)}
                                helperText={formik.touched.oib && formik.errors.oib}
                            />
                            <div className="d-flex flex-column flex-sm-row justify-content-evenly align-items-center">
                                <TextField
                                    className="my-2 mr-sm-2"
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    id="address"
                                    name="address"
                                    label="Adresa tvrtke"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                                <Autocomplete
                                    id="city"
                                    name="city"
                                    options={cities}
                                    getOptionLabel={(option) => option.city}
                                    fullWidth
                                    className="my-2 ml-sm-2"
                                    onChange={(_, value) => formik.setFieldValue('city', value ? value.id : '')}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            name="city"
                                            size="small"
                                            variant="outlined"
                                            label="Mjesto tvrtke"
                                            error={formik.touched.city && Boolean(formik.errors.city)}
                                            helperText={formik.touched.city && formik.errors.city}
                                        />
                                    }
                                />
                            </div>
                            <TextField
                                className="my-2"
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="phone"
                                name="phone"
                                label="Broj telefona"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                            <TextField
                                className="my-2"
                                fullWidth
                                size="small"
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
                                size="small"
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

export default SignupService;
