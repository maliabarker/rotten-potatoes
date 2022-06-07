// movies.js

module.exports = function(app) {
    // const MovieDB = require('moviedb-promise')

    const { MovieDb } = require('moviedb-promise')
    const moviedb = new MovieDb('cb218379ccca6b7a4bb34b7761507fd3')

    app.get('/', (req, res) => {
        moviedb.movieNowPlaying().then(response => {
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
    });  
  
  }