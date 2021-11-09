import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();

    const handelOnBlur = e => {
        setEmail(e.target.value);
    }

    const handelAdminSubmit = e => {
        const user = { email };

        fetch('https://secure-eyrie-94690.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true);
                }
            })
        e.preventDefault();
    }
    return (
        <div>
            <h2>Make an admin</h2>
            <form onSubmit={handelAdminSubmit}>
                <TextField
                    sx={{ width: '50%' }}
                    label="Email"
                    type="email"
                    onBlur={handelOnBlur}
                    variant="standard" />
                <Button
                    type="submit"
                    variant="outlined">Make Admin</Button>
            </form>
            {
                success && <Alert severity="success">Made Admin Successfully!</Alert>
            }
        </div>
    );
};

export default MakeAdmin;