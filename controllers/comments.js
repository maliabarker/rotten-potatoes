// comments.js
const Comment = require('../models/comment');

module.exports = (app) => {

    // CREATE Comment
    app.post('/movies/:movieId/reviews/:reviewId/comments', (req, res) => {
        Comment.create(req.body).then((comment) => {
          console.log(comment)
          console.log(comment.movieId)
          res.redirect(`/movies/${comment.movieId}/reviews/${comment.reviewId}`);
        }).catch((err) => {
          console.log(err.message);
        });
    });

    // DELETE
    app.delete('/movies/:movieId/reviews/:reviewId/comments/:id', function (req, res) {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/movies/${comment.movieId}/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })
};