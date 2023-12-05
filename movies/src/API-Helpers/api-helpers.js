import axios from 'axios'

export const getAllMovies = async () => {
    const res = await axios.get("/movies")
    .catch((err) => {
        console.log(err)
    })
    if(res.status !== 200) {
        return console.log("No data")
    }
    const data = await res.data;
    return data;
} 

export const sendUserAuthRequest = async (data, signup) => {
    const res = await axios.post(`users/${signup? "signup" : "login"}`, {
        name: signup ? data.name : "",
        email: data.email,
        password: data.password
    }).catch((err) => console.log(err))
    if (res.status !== 200 && res.status !== 201) {
        console.log("Unexpected Error Occured");
    }

    const resData = await res.data;
    return resData;
}
 
export const sendAdminAuthRequest = async (data) => {
    const res = await axios.post("/admin/login", {
        email: data.email,
        password: data.password
    }).catch((err) => console.log(err))

    if(res.status !== 200) {
        return console.log("Unexpected error occurred.")
    }
    const resData = await res.data;
    return resData;
}

export const getUserBooking = async() => {
    const id = localStorage.getItem('userId');
    const res = await axios.get(`/users/bookings/${id}`)
    .catch((err)=>console.log(err));
    if (res.status !== 201) {
        return console.log("Unexpected error")
    }
    const resData = await res.data;
    console.log(resData);
    return resData;
}

export const getMoviedetails=async(id)=>{
    const res=await axios.get(`/movies/${id}`).catch((err)=>{console.log(err)})
    if(res.status!==200)
    {
     return console.log("unexpected error")
    }
    const resData=await res.data;
    return resData;
 };
export const newBooking=async(data)=>{
    const res=await axios.post('/booking',{
        movie:data.movie,
        seatNumber:data.seatNumber,
        date:data.date,
        user:localStorage.getItem("userId")
    })
    .catch((err)=>{console.log(err)});
    console.log(data,localStorage.getItem("userId"));
    if(res.status!==201)
    {
        return console.log("unexpected error")
    }
    const resdata=await res.data;
    return resdata;
 }

 export const deleteBooking=async(id)=>{
    const res=await axios.delete(`/booking/${id}`).catch((err)=>{
        console.log(err);
    })
    if(res.status!==200)
    {
        console.log("unexpected error");
    } 
    const resData= await res.data;
    return resData; 
}
export const getUserDetails =async()=>{
    const id = localStorage.getItem("userId");

    const res = await axios.get(`/users/${id}`)
    .catch((err) => console.log(err));
    
    if (res.status !== 200) { 
     return console.log("Unexpected Error");   
    }
    const respData = await res.data;
    console.log(respData);
    return respData;
}
export const addMovie = async (data) => {
    const res=await axios.post('/movies/add',{
        title:data.title,
        description:data.description,
        releaseDate:data.releaseDate,
        posterUrl:data.posterUrl,
        actors:data.actors,
        admin:localStorage.getItem('adminId'),
    },{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).catch((err)=>console.log(err))
    if (res.status !== 201) {
                return console.log("Unexpected Error");
            }
            const resData = await res.data;
            return resData;
}
export const getAdminById = async () => {
    const adminId = localStorage.getItem("adminId");
    const res = await axios.get(`/admin/${adminId}`)
    .catch(err => console.log(err));
    if (res.status !== 200) { 
        return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;   
}