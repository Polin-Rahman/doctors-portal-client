import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80% !important',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const AppointmentModal = ({ openBooking, handleBookingClose, booking, date, setBookinSuccess }) => {

    const { name, time } = booking;

    const { user } = useAuth();

    const initialInfo = { patientName: user.displayName, email: user.email, phone: '' }

    const [bookingInfo, setBookingInfo] = useState(initialInfo);

    const handelOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo };
        newInfo[field] = value;

        setBookingInfo(newInfo);
    }

    const handelBookingSubmit = e => {
        // collect data
        const appointment = {
            ...bookingInfo,
            time,
            serviceName: name,
            date: date.toLocaleDateString()
        }

        // send to Server
        fetch('https://secure-eyrie-94690.herokuapp.com/appointments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setBookinSuccess(true);
                    handleBookingClose();
                }
            })
        e.preventDefault();
    }

    return (
        <Modal
            keepMounted
            open={openBooking}
            onClose={handleBookingClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    {name}
                </Typography>
                <form onSubmit={handelBookingSubmit}>
                    <TextField
                        disabled
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        defaultValue={time}
                        size="small"
                    />
                    <TextField
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        name="patientName"
                        onBlur={handelOnBlur}
                        defaultValue={user.displayName}
                        size="small"
                    />
                    <TextField
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        name="email"
                        onBlur={handelOnBlur}
                        defaultValue={user.email}
                        size="small"
                    />
                    <TextField
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        name="phone"
                        onBlur={handelOnBlur}
                        defaultValue="Phone Number"
                        size="small"
                    />
                    <TextField
                        disabled
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        value={date.toDateString()}
                        size="small"
                    />
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#19D3AE' }}>SUBMIT</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AppointmentModal;