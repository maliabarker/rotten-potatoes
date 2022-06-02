// app.js
const express = require('express');
const methodOverride = require('method-override');
const app = express();

var exphbs = require('express-handlebars');

// var hbs = exphbs.create({
//     // Specify helpers which are only registered on this instance.
//     helpers: {
//         select: function(selected, options) {
//             console.log(selected)
//             return options.fn(this).replace(
//                 new RegExp(' value=\"' + selected + '\"'),
//                 '$& selected="selected"');
                
//         }
//     },
//     defaultLayout: 'main',
//     partialsDir: ['views/partials/']
//   });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    movieRating: Number
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" }
// ]

// ROUTES

// hello world route
// app.get('/', (req, res) => {
//     res.render('home', { msg: 'Handlebars are Cool!' });
// })

// INDEX
app.get('/', (req, res) => {
    Review.find().lean()
      .then(reviews => {
        res.render('reviews-index', { reviews: reviews });
        // console.log(reviews)
      })
      .catch(err => {
        console.log(err);
      })
})

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
    Review.findById(req.params.id).lean().then((review) => {
      res.render('reviews-show', { review: review })
    }).catch((err) => {
      console.log(err.message);
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

// reviews (index) route
// app.get('/', (req, res) => {
//     res.render('reviews-index', { reviews: reviews });
// })

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})