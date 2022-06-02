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

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const reviews = require('./controllers/reviews')(app);

// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" }
// ]

// ROUTES

// hello world route
// app.get('/', (req, res) => {
//     res.render('home', { msg: 'Handlebars are Cool!' });
// })

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})