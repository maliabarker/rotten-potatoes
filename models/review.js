// models/review.js

// const mongoose = require('mongoose');

// const Review = mongoose.model('Review', {
//   title: String,
//   description: String,
//   movieTitle: String
// });

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    movieRating: Number
});

module.exports = Review;