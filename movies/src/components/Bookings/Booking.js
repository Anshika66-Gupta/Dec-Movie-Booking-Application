import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMoviedetails, newBooking } from '../../API-Helpers/api-helpers';
import { Box, Button, Dialog, FormLabel, TextField, Typography } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from 'react-redux';
const labelStyle = {mt:4, mb:2}

const Booking = () => {
  const isUserLoggedIn = useSelector((state)=>state.user.isLoggedIn)
  const navigate = useNavigate();
    let Id = useParams().id;
    const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
    const [movie, setmovie] = useState()
    useEffect(()=>{
      getMoviedetails(Id).then((res)=>{
          setmovie(res.movie);
      })
  },[Id]);
       const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
      newBooking({ ...inputs, movie: movie._id }).then((res) => console.log(res)).catch((err) => console.log(err));
    }

  return (
    <Box>
    { movie && isUserLoggedIn && (<>
      <Typography variant="h4" align='center' margin={2}>
        Book Tickets for {movie.title}
      </Typography>
      <Box display={"flex"} margin={6}>
        <Box display={"flex"} flexDirection={"column"} width={"50vw"} justifyContent={"center"}>
          <Box width={"40vw"} height={"50vh"} margin={1.5} >
          <img src={movie.posterUrl} alt={movie.title} width={"100%"} height={"100%"} />
          </Box>
          <Typography variant='body' fontStyle={'italic'} margin={1.5} padding={1} borderLeft={1}>{movie.description}</Typography>
          <Box display={"flex"} flexWrap={"wrap"} margin={1}>
            <Typography fontStyle={'italic'}>Cast:&nbsp; </Typography>
            {movie.actors.map((item)=><Typography fontStyle={'italic'}>{item} &nbsp;</Typography>)}
          </Box>
          <Typography margin={1} fontStyle={'italic'}>Release Date: {new Date(movie.releaseDate).toDateString()}</Typography>
        </Box>
          <form onSubmit={handleSubmit}>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignContent={"center"} margin={5} width={"40vw"}  padding={3} borderRadius={5} boxShadow={"10px 10px 10px #ccc"}>
              <Typography variant='h5' align='center' mb={1}>Booking Details</Typography>
              <FormLabel sx={labelStyle}>Seat Number</FormLabel>
              <TextField value={inputs.seatNumber} onChange={handleChange} name='seatNumber' type={'number'} margin="normal" variant='standard'/>
              <FormLabel sx={labelStyle}>Pick a Date</FormLabel>
              <TextField value={inputs.date} onChange={handleChange} name='date' type={"date"} margin="normal" variant='standard'/>
              {/* <Box value={inputs.date} onChange={handleChange}>
                <DatePicker />
              </Box> */}
              <Button sx={{borderRadius: 5, margin:6}} variant='outlined' color='success' type='submit'>Confirm</Button>
            </Box>
          </form>
      </Box></>)}

      {!isUserLoggedIn && (<>
        <Dialog open={true} PaperProps={{style:{borderRadius:10}}}>
        <Box margin={4}>
          <Typography variant='h5' padding={1}>User Not Logged In</Typography>
          <Typography variant='h6' padding={1}>You need to login to proceed further.</Typography>
          <Box align={"center"} mt={3}>
          <Button onClick={()=>navigate("/auth")} variant='outlined' color='secondary' sx={{borderRadius:2, margin:1}}>Login</Button>
          <Button onClick={()=>navigate("/")} variant='outlined' color='secondary' sx={{borderRadius:2, margin:1}}>Cancel</Button>
          </Box>
          </Box>
        </Dialog>
      </>)}
    </Box>
  )
}

export default Booking