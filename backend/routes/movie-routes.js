const express = require('express');
const movieRouter = express.Router();

const { addMovie, getAllMovie, getMovieById } = require('../controllers/movie-controller');

movieRouter.get("/", getAllMovie);
movieRouter.post("/add", addMovie);
movieRouter.get("/:id", getMovieById)
 
module.exports = movieRouter