import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useNavigate } from 'react-router-dom';

const labelStyle = {mt:1, mb:2}

const AuthForm = ({onSubmit, isAdmin}) => {

    const navigate = useNavigate();
    const crossHandler = () => {
        navigate("/")
    }

    const [inputs, setinputs] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isSignup, setisSignup] = useState(false);
    const handleChange = (e) => {
        setinputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
            // [e.target.email]: e.target.email,
            // [e.target.password]: e.target.password
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({inputs, signup: isAdmin?false:isSignup});
    }
    
  return (
    <Dialog PaperProps={{style:{borderRadius:20}}} open={true}>
        <Box sx={{ ml:'auto', padding:1 }}>
            <IconButton onClick={crossHandler}>
            <ClearRoundedIcon />
            </IconButton>
        </Box>
        <Typography variant='h4' textAlign={'center'} >
         {isSignup?"Signup":"Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
            <Box padding={6} display={'flex'} justifyContent={'center'} flexDirection={'column'} width={400} margin={'auto'} alignContent={'center'}>

                { !isAdmin && isSignup && (
                    <>
                    <FormLabel sx={labelStyle}>Name</FormLabel>
                <TextField value={inputs.name} onChange={handleChange} variant='standard' margin='normal' type={'name'} name='name' />
                </>
                )}
                
                <FormLabel sx={labelStyle}>Email</FormLabel>
                <TextField value={inputs.email} onChange={handleChange} variant='standard' margin='normal' type={'email'} name='email' />

                <FormLabel sx={labelStyle}>Password</FormLabel>
                <TextField value={inputs.password} onChange={handleChange} variant='standard' margin='normal' type={'password'} name='password' />

                <Button sx={{ mt:2, borderRadius:10, bgcolor:"#2b2d42"}} type='submit' fullWidth variant='contained'>
                    {isSignup?"Signup":"Login"}
                </Button>

                { !isAdmin && 
                    (<Button onClick={() => setisSignup(!isSignup)} sx={{ mt:2, borderRadius:10}} fullWidth >
                    Switch to {isSignup?"Login":"Signup"}
                </Button>)}
            </Box>
        </form>
    </Dialog>
  )
}

export default AuthForm