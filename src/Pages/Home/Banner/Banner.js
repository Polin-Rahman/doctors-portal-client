import React from 'react';
import Grid from '@mui/material/Grid';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import { Button, Typography, Container, Box } from '@mui/material';

const bannerBg = {
    background: `url(${bg})`,
}

const verticalCenter = {
    height: 400,
    display: 'flex',
    alignItems: 'center'
}

const Banner = () => {
    return (
        <Container style={bannerBg} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid style={{ ...verticalCenter, textAlign: 'left' }} item xs={12} md={6}>
                    <Box>
                        <Typography variant="h3">
                            Your New Smile <br />
                            Starts Here
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ my: 3, fontSize: 13, fontWeight: 300 }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque cum esse asperiores repudiandae maxime tenetur repellendus odit facilis fuga sint!
                        </Typography>
                        <Button variant="contained" style={{ backgroundColor: '#19D3AE' }}>GET APPOINTMENT</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} style={verticalCenter}>
                    <img style={{ width: '350px' }} src={chair} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Banner;