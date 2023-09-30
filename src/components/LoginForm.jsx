import React from 'react';
import { Box, Button, Card, CardMedia, Grid, TextField, Typography, Link, IconButton, InputAdornment, FormControl, FilledInput, FormHelperText } from '@mui/material';
import bgimg from '../images/bgimg.svg';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getData } from '../services/loginService';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().min(8)
        .max(8, "Password must contain 8 characters")
        .matches(/[A-Z]/, "password must contain one uppercase")
        .matches(/[a-z]/, "password must contain lowercase letters")
        .matches(/[0-9]/, "Password must contain a number")
        .matches(/[^a-zA-z0-9]/, "Password must contain a number")
        .required(),
});

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = async (data) => {
        const { username, password } = data;
        console.log(username, password);
        let loginResponse = await getData(data.username, data.password);
        console.log(loginResponse, "loginResponse");
        if (loginResponse.status == 200) {
            navigate('/Dashboard')
        }else if(username != password && loginResponse.status == 400){
            alert('Invalid Username & Password');
        }else{
            alert('User Does Not Exsists')
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(170deg,#1a237e,#ffffff)' }}>
            <Card sx={{ p: 5 }}>
                <Grid container display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    <Grid item display={{ lg: 'flex', md: 'flex', sm: 'none', xs: 'none' }}>
                        <CardMedia component={'img'} image={bgimg} sx={{ width: { lg: '70vh', md: '48vh' } }} />
                    </Grid>
                    <Grid item>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container display={'flex'} flexDirection={'column'} alignContent={'flex-start'}>
                                <Grid item>
                                    <Typography color={'#1a237e'} fontWeight={'bold'} fontSize={{ lg: '40px', md: '30px', sm: '25px', xs: '22px' }}>User Login</Typography>
                                </Grid>
                                <Grid item mt={5}>
                                    <Typography color={'#1a237e'} pb={1} fontSize={'20px'}>Username</Typography>
                                    <TextField variant='filled' placeholder='Enter Your Username' type='text' fullWidth
                                        {...register('username')}
                                        error={Boolean(errors.username)}
                                        helperText={errors.username?.message} />
                                </Grid>
                                <Grid item mt={3}>
                                    <Typography color={'#1a237e'} pb={1} fontSize={'20px'}>Password</Typography>
                                    <FormControl fullWidth>
                                    <FilledInput placeholder='Enter Your Password' type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                              >
                                                {showPassword ?  <Visibility /> : <VisibilityOff /> }
                                              </IconButton>
                                            </InputAdornment>
                                          }
                                        {...register('password')}
                                        error={Boolean(errors.password)}
                                        />
                                        <FormHelperText sx={{color:'#d32f2f'}}>{errors.password?.message}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item mt={1}>
                                    <Link component="button" underline='none' color='#1a237e'>Forgot Password?</Link>
                                </Grid>
                                <Grid item mt={5}>
                                    <Button variant='contained' type='submit' sx={{ background: '#1a237e', width: '350px', height: '50px', borderRadius: '25px' }}>Login</Button>
                                </Grid>
                                <Grid item mt={1}>
                                    <Link component="button" onClick={() => {navigate('/RegisterForm')}} underline='none' color='#1a237e'>New User? Create An Account</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}

export default Login;