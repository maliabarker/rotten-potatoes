// scripts.js

// Only run this if we find the new-comment element
if (document.getElementById('new-comment')) {
    // listen for a form submit event
    document.getElementById("new-comment").addEventListener("submit", e => {
        // prevent the default form behavior
        e.preventDefault();
    
        // serialize the form data into an object
        let comment = {};
        const inputs = document.getElementsByClassName('form-control');
        for (var i = 0; i < inputs.length; i++) {
          comment[inputs[i].name] = inputs[i].value;
        }
        // console.log('comment:', comment)

        // We'll need this for re-constructing our delete form
        const movieId = comment.movieId;
        const reviewId = comment.reviewId;
        // console.log('movieId:', movieId)
        // console.log('reviewId:', reviewId)
    
        // use axios to initialize a post request and send in the form data
    
        axios.post(`/movies/${movieId}/reviews/${reviewId}/comments`, comment)
          .then(function (response) {
            // wait for the success response from the server
            console.log("response: ", response);
            // remove the information from the form
            document.getElementById('new-comment').reset();
            // display the data as a new comment on the page
            document.getElementById('comments').insertAdjacentHTML('afterbegin',
                `<div class="card">
                    <div class="card-block">
                        <h4 class="card-title">${response.data.comment.title}</h4>
                        <p class="card-text">${response.data.comment.content}</p>
                        <p>
                            <form method="POST" action="/movies/${movieId}/reviews/${response.data.comment.reviewId}/comments/${response.data.comment._id}?_method=DELETE">
                                <button class="btn btn-link" type="submit">Delete</button>
                            </form>
                        </p>
                    </div>
                </div>`
            );
          })
          .catch(function (error) {
            console.log(error);
            // handle any errors
            alert('There was a problem saving your comment. Please try again.')
          });
    });
}




// TESTING AXIOS
// // Make a request to the color api
// axios.get('http://www.thecolorapi.com/id?hex=24B1E0')
//   .then(function (response) {
//     // handle success
//     alert(response.data.hex.value);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   });