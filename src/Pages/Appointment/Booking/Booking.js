import { Button, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import BookingModal from '../BookingModal/BookingModal';


const Booking = ({ booking, date, setBookinSuccess }) => {

    const { name, time, space } = booking;

    const [openBooking, setOpenBooking] = React.useState(false);
    const handleBookingOpen = () => setOpenBooking(true);
    const handleBookingClose = () => setOpenBooking(false);

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ py: 5 }}>
                    <Typography variant="h6" gutterBottom component="div" style={{ color: '#19D3AE', fontWeight: 600 }}>
                        {name}
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom component="div"
                        sx={{ fontWeight: 600 }}>
                        {time}
                    </Typography>

                    <Typography variant="caption" display="block" gutterBottom>
                        {space} SPACES AVAILABLE
                    </Typography>

                    <Button onClick={handleBookingOpen} variant="contained" style={{ backgroundColor: '#19D3AE' }}>BOOK APPOINTMENT</Button>

                </Paper>
            </Grid>
            <BookingModal
                date={date}
                booking={booking}
                openBooking={openBooking}
                handleBookingClose={handleBookingClose}
                setBookinSuccess={setBookinSuccess}
            >
            </BookingModal>
        </>
    );
};

export default Booking;