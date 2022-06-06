// models/review.js

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const { default: mongoose } = require('mongoose');
const uri = "mongodb+srv://maliabarker:supersecretpassword@cluster0.mnou0t0.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// mongoose.connect(uri)
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
}

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    movieRating: Number
});

module.exports = Review;