// models/review.js

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

// const uri = "mongodb+srv://maliabarker:supersecretpassword@cluster0.mnou0t0.mongodb.net/?retryWrites=true&w=majority";
// try {
//     // Connect to the MongoDB cluster
//      mongoose.connect(
//       uri,
//       { useNewUrlParser: true, useUnifiedTopology: true },
//       () => console.log(" Mongoose is connected")
//     );

//   } catch (e) {
//     console.log("could not connect");
// }

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    movieRating: Number
});

module.exports = Review;