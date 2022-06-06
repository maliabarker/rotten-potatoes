// models/review.js

const mongoose = require('mongoose');

const Review = mongoose.model('Review', new mongoose.Schema({
    title: String,
    description: String,
    movieTitle: String,
    movieRating: Number
}, {
    timestamps: true
}));

// const Review = mongoose.model('Review', reviewScheme);

module.exports = Review;