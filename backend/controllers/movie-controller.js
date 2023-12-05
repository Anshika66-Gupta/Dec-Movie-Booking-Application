const jwt = require("jsonwebtoken")
const Movie = require("../models/Movies")
const mongoose=require('mongoose');
const admin = require("../models/Admin");

const addMovie = async (req, res, next) => { 
    const extractedToken = req.headers.authorization.split(" ")[1];
    if(!extractedToken && extractedToken.trim() ==="") {
        return res.status(404).json({message: "Token not found"})
    }
    console.log(extractedToken);
    let adminId;

    //verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if(err){
            return res.status(401).json({message: 'Invalid Token'})
        }
        else{
            adminId = decrypted.id;
            return;
        }
    })

    //create new movie
    const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
    console.log(req.body);

        if(res.status==400)
        {
            res.send("error");
        }
    if(!title && title.trim() ==="" && !description && description.trim() ==="" && !posterUrl && posterUrl.trim() ===""){
        return res.status(422).json({message: `Invalid Inputs`})
    }

    let movie; 
    try{
        movie = new Movie({title, description, releaseDate: new Date(`${releaseDate}`), posterUrl, featured, actors, admin: adminId})
        
        const session=await mongoose.startSession();
        const adminUser= await admin.findById(adminId);

        session.startTransaction();
        await movie.save({session})
        adminUser.addedMovies.push(movie);
        await adminUser.save({session});

        await session.commitTransaction();
    } catch (err){
        return res.send(err.message);
    }

    if(!movie) {
        return res.status(500).json({message: "Request Failed"})
    }
    return res.status(201).json({movie})
}

const getAllMovie = async (req, res, next) => {
    
    let movies;
    try{
        movies = await Movie.find();
    } catch (err){
        return console.log(err);
    }

    if(!movies){
        return res.status(500).json({message: "Request failed"});
    }
    return res.status(200).json({movies});
}

const getMovieById = async (req, res, next) => {
    const id = req.params.id;
    let movie;

    try{
        movie = await Movie.findById(id);
    } catch (err){
        return console.log(err);
    }
    if(!movie){
        return res.status(404).json({message: "Invalid Movie Id"});
    }
    return res.status(200).json({movie})
}


module.exports = {addMovie, getAllMovie, getMovieById}