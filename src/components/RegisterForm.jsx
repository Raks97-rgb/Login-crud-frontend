import React from 'react';
import {
    Button, Card, Grid, Stack, TextField, Typography, Box, InputAdornment, FormControl,
    FormHelperText, IconButton, OutlinedInput
} from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerPostdata, registerGetdata } from '../services/registerService';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const schema = yup.object().shape({
    firstname: yup.string().max(10).required('Firstname is required')
        .test('is-unique', 'FirstName already taken', async function (firstname) {
            if (firstname) {
                console.log("query",firstname)
                const isTaken = await registerGetdata(firstname);
                console.log("isTaken",isTaken,isTaken?.data,isTaken?.status);
                if (isTaken.status === 400 && isTaken?.data === 'FirstName already taken') {
                    return false;
                }
                else if (isTaken.status === 200 && isTaken?.data === "Firstname Available"){
                    return true;
                }
            }
        }),
    lastname: yup.string().required('Lastname is required'),
    password: yup.string().min(8)
             .max(8, "Password must contain 8 characters")
             .matches(/[A-Z]/, "password must contain one uppercase")
             .matches(/[a-z]/, "password must contain lowercase letters")
             .matches(/[0-9]/, "Password must contain a number")
             .matches(/[^a-zA-z0-9]/, "Password must contain a number")
             .required(),
    confirmpassword: yup.string().required('Enter the same password')
        .oneOf([yup.ref('password'), null], 'Password should match'),
    email: yup.string().email().required('Email is required'),
    phno: yup.string().required('Phone No. is required')
});

function RegisterForm() {
    const naviagate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [confirmPassword, setConfirmPassword] = React.useState(false);

    const handleClickConfirmPassword = () => setConfirmPassword((view) => !view);

    const onSubmit = async (data) => {
        const { firstname, lastname, password, confirmpassword, email, phno } = data;
        console.log(firstname, lastname, password, confirmpassword, email, phno);
        try {
            let regresp = await registerPostdata(data.firstname, data.lastname, data.password, data.confirmpassword, data.email, data.phno);
            if (regresp.data) {
                naviagate('/');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(170deg,#1a237e,#ffffff)' }}>
                <Card sx={{ p: 5 }}>
                    <Typography variant='h4' fontWeight={'bold'} color={'#1a237e'}>Register Here</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container display={'flex'} flexDirection={'column'} alignContent={'center'} spacing={5} pt={3}>
                            <Grid item>
                                <Grid container display={'flex'} flexDirection={'row'} spacing={3}>
                                    <Grid item >
                                        <Typography>FirstName</Typography>
                                        <TextField type='text'
                                            {...register('firstname')}
                                            error={Boolean(errors.firstname)}
                                            helperText={errors.firstname?.message} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>LastName</Typography>
                                        <TextField type='text'
                                            {...register('lastname')}
                                            error={Boolean(errors.lastname)}
                                            helperText={errors.lastname?.message} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container display={'flex'} flexDirection={'row'} spacing={3}>
                                    <Grid item>
                                        <Typography>Password</Typography>
                                        <FormControl sx={{ width: '230px' }}>
                                            <OutlinedInput type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                {...register('password')}
                                                error={Boolean(errors.password)}
                                            />
                                            <FormHelperText sx={{ color: '#d32f2f' }}>{errors.password?.message}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Confirm Password</Typography>
                                        <FormControl sx={{ width: '230px' }}>
                                            <OutlinedInput type={confirmPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickConfirmPassword}
                                                            edge="end"
                                                        >
                                                            {confirmPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                {...register('confirmpassword')}
                                                error={Boolean(errors.confirmpassword)}
                                            />
                                            <FormHelperText sx={{ color: '#d32f2f' }}>{errors.confirmpassword?.message}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container display={'flex'} flexDirection={'row'} spacing={3}>
                                    <Grid item>
                                        <Typography>Email</Typography>
                                        <TextField type='text '
                                            {...register('email')}
                                            error={Boolean(errors.email)}
                                            helperText={errors.email?.message} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>Phone Number</Typography>
                                        <TextField type='tel'
                                            {...register('phno')}
                                            error={Boolean(errors.phno)}
                                            helperText={errors.phno?.message} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Stack direction={'row'} spacing={2}>
                                    <Button variant='contained' type='submit' sx={{ background: '#1a237e', px: 6 }}>Save</Button>
                                    <Button variant='outlined' type='reset' sx={{ color: '#1a237e', borderColor: '#1a237e', px: 5 }}>Cancel</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Box>
        </div>
    );
}

export default RegisterForm;