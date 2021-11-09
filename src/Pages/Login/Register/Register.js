import React, { useState } from 'react';
import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';
import login from '../../../images/login.png';
import useAuth from '../../../hooks/useAuth';

const Register = () => {

    const [loginData, setLoginData] = useState({});
    const history = useHistory();
    const { user, registerUser, isLoading, authError } = useAuth();

    const handelOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;

        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handelLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Password did not matched');
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, history);
        e.preventDefault();
    }

    return (
        <Container>
            <Grid container spacing={2}>

                <Grid sx={{ mt: 8 }} item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Please Register
                    </Typography>

                    {!isLoading && <form onSubmit={handelLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Name"
                            type="text"
                            name="name"
                            onBlur={handelOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            type="email"
                            name="email"
                            onBlur={handelOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onBlur={handelOnBlur}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Re-Type Your Password"
                            type="password"
                            name="password2"
                            onBlur={handelOnBlur}
                            variant="standard" />

                        <Button type="submit" sx={{ width: '75%', m: 1 }} variant="contained" style={{ backgroundColor: '#19D3AE' }}>Register</Button>

                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/login">
                            <Button variant="text">Already Registered? Please Login</Button>
                        </NavLink>
                    </form>}
                    {
                        isLoading && <CircularProgress />
                    }

                    {
                        user?.email && <Alert severity="success">User Created successfully!</Alert>
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

export default Register;