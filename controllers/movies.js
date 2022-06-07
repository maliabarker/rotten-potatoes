// movies.js

module.exports = function(app) {
    // const MovieDB = require('moviedb-promise')

    const { MovieDb } = require('moviedb-promise')
    const moviedb = new MovieDb('cb218379ccca6b7a4bb34b7761507fd3')

    app.get('/', (req, res) => {
        moviedb.movieNowPlaying().then(movies => {
            // res.render('movies-index', { movies: response.results });
            moviedb.genreMovieList().then(genres => {
                // console.log(genres.genres)
                // console.log(movies)

                movies.results.forEach(function (movie) {
                    // console.log(movie.genre_ids);
                    movie_genres = []
                    movie.genre_ids.forEach(function (movie_genre) {
                        genres.genres.forEach(function (genre) {
                            // console.log(genre)
                            if (movie_genre == genre.id){
                                // console.log(movie_genre)
                                movie_genres.push(genre.name)
                            }
                        })
                    })
                    // console.log(movie.title)
                    // console.log(movie_genres)
                    movie['genres_str'] = movie_genres
                    // console.log(movie)
                });


                res.render('movies-index', { movies: movies.results, genres: genres.genres });
            });
        }).catch(console.error);

        // moviedb.genreMovieList().then(response => {
        //     res.render('movies-index', { genres: response.results });
        //     console.log(response.results)
        // }).catch(console.error);
    });  
  
  }