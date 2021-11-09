import { Alert, Button, CircularProgress, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.png';

const Login = () => {

    const [loginData, setLoginData] = useState({});

    const { user, loginUser, isLoading, authError, signInWithGoogle } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handelOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;

        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handelLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }

    const handelGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    return (
        <Container>
            <Grid container spacing={2}>

                <Grid sx={{ mt: 8 }} item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>

                    {!isLoading && <form onSubmit={handelLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onBlur={handelOnChange}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onBlur={handelOnChange}
                            variant="standard" />

                        <Button type="submit" sx={{ width: '75%', m: 1 }} variant="contained" style={{ backgroundColor: '#19D3AE' }}>LOGIN</Button>

                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/register">
                            <Button variant="text">New User? Please Register</Button>
                        </NavLink>
                    </form>}

                    {
                        isLoading && <CircularProgress />
                    }

                    <Typography sx={{ color: 'warning.main' }} variant="button" display="block" gutterBottom>
                        ------------------------ Or ------------------------
                    </Typography>

                    <Button onClick={handelGoogleSignIn} sx={{ mb: 4 }} variant="contained" color="error">Google Sign-In</Button>

                    {
                        user?.email && <Alert severity="success">Loggedin successfully!</Alert>
                    }

                    {
                        authError && <Alert severity="error">{authError}</Alert>
                    }
                </Grid>

                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={login} alt="" />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Login;