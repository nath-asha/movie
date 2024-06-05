const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new movie
router.post('/', async (req, res) => {
    const { title, genre, year, director, actors, description } = req.body;

    try {
        const movie = new Movie({
            title, genre, year, director, actors, description
        });

        const createdMovie = await movie.save();
        res.status(201).json(createdMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search movies
router.get('/search', async (req, res) => {
    const { title, genre, year } = req.query;

    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (genre) query.genre = { $regex: genre, $options: 'i' };
    if (year) query.year = year;

    try {
        const movies = await Movie.find(query);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
