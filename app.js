// app.js
const express = require('express');
const methodOverride = require('method-override');
const app = express();

var exphbs = require('express-handlebars');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);

module.exports = app;


// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" }
// ]

// ROUTES

// hello world route
// app.get('/', (req, res) => {
//     res.render('home', { msg: 'Handlebars are Cool!' });
// })

// app.listen(3000, () => {
//   console.log('App listening on port 3000!')
// })

const port = process.env.PORT || 3000;
app.listen(port);