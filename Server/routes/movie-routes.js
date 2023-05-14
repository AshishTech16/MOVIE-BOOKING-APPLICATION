const express = require('express');
const { addMovie, getAllMovie, getMovieById } = require('../controllers/movie-controller');
const movieRouter = express.Router();

movieRouter.get("/", getAllMovie);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);

module.exports = movieRouter;