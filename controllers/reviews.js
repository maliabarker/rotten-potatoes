//reviews.js

const Review = require('../models/review');
const Comment = require('../models/comment')
// Got to import the libary
const moment = require('moment');

module.exports = function(app) {

    // app.get('/', (req, res) => {
    //   Review.find().lean()
    //     .then(reviews => {
    //       res.render('reviews-index', {reviews: reviews});
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // });

    // NEW REVIEW
    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new', {title: "New Review"});
    })

    // CREATE
    app.post('/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
        }).catch((err) => {
        console.log(err.message);
        })
    })

    // SHOW
    app.get('/reviews/:id', (req, res) => {
        // find review
        Review.findById(req.params.id).lean().then(review => {
            let createdAt = review.createdAt;
            createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm a');
            review.createdAtFormatted = createdAt;
            console.log(createdAt)
        // fetch its comments
        Comment.find({ reviewId: req.params.id }).lean().then(comments => {
            // respond with the template with both values
            res.render('reviews-show', { review: review, comments: comments })
        })
        }).catch((err) => {
        // catch errors
        console.log(err.message)
        });
    });

    // EDIT
    app.get('/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review, title: "Edit Review"});
        }).lean();
    });

    // UPDATE
    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message)
        });
    });

    // DELETE
    app.delete('/reviews/:id', function (req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
        }).catch((err) => {
        console.log(err.message);
        });
    });
  
  }

