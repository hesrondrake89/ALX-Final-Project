const tmdbApiKey = 'fc90ff78fa17b85bf5bcbdd19e6c16c5'; // TMDB API Key
const omdbApiKey = '8a8cd539'; // OMBD API Keys

// This is the functions to fetch and display movie data from OMDB API
async function fetchMovieData(title) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${omdbApiKey}`);
        const data = await response.json();

        if (data.Response === 'False') {
            document.getElementById('movieData').innerHTML = `<p>${data.Error}</p>`;
        } else {
            // this section construsts URL parameters for movie details
            const params = new URLSearchParams();
            params.set('title', data.Title);
            params.set('year', data.Year);
            params.set('director', data.Director);
            params.set('runtime', data.Runtime);
            params.set('actors', data.Actors);
            params.set('genre', data.Genre);
            params.set('plot', data.Plot);
            params.set('rating', data.imdbRating);
            params.set('poster', data.Poster);

            // This function construct the URL with parameters for movie_info.html
            const movieInfoURL = `movie_info.html?${params.toString()}`;

            // Redirect to the new page
            window.location.href = movieInfoURL;
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

// This is the function to fetch and display upcoming movies from TMDb API
async function fetchUpcomingMovies() {
    try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}&language=en-US&page=1`);
    const data = await response.json();

    if (data.results) {
        const movieContainer = document.querySelector('.movie-container');
        movieContainer.innerHTML = ''; // Clear existing content

        // Create an array to hold movie elements
        const movieElements = data.results.map(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'movie';

            const moviePoster = document.createElement('img');
            moviePoster.src = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`;
            moviePoster.alt = movie.title;

            const movieTitle = document.createElement('p');
            movieTitle.textContent = movie.title;
            movieTitle.style.cursor = 'pointer';

            // This function adds a click event to the movie title to fetch and display movie information from OMDB API
            movieTitle.addEventListener('click', function () {
                fetchMovieDataFromOMDB(movie.title);
            });

            movieElement.appendChild(moviePoster);
            movieElement.appendChild(movieTitle);

            return movieElement;
        });

        // Append all movie elements to the container
        movieElements.forEach(movieElement => {
            movieContainer.appendChild(movieElement.cloneNode(true));
        });
    }

    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
    }
}

// This calls the function to fetch and display upcoming movies when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchUpcomingMovies();
});

// This is the search button click event
document.getElementById('fetchButton').addEventListener('click', () => {
    const movieTitle = document.getElementById('movieTitleInput').value;

    // This code checks if the input is empty
    if (!movieTitle) {
        // This displays an error message if the input is empty
        const errorMessage = 'Title is required. Please enter a movie or series title.';
        document.getElementById('errorMessage').textContent = errorMessage;
    } else {
        // This clears any previous errors
        document.getElementById('errorMessage').textContent = '';
        // This calls the function to fetch movie data
        fetchMovieData(movieTitle);
    }
});

// This is the function to fetch and display upcoming movies from TMDb API
async function fetchUpcomingMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}&language=en-US&page=1`);
        const data = await response.json();

        if (data.results) {
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = ''; // This code clears existing content

            data.results.slice(0, 30).forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.className = 'movie';

                const moviePoster = document.createElement('img');
                moviePoster.src = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`;
                moviePoster.alt = movie.title;

                const movieTitle = document.createElement('p');
                movieTitle.textContent = movie.title;
                movieTitle.style.cursor = 'pointer';

                // This function adds a click event to the movie title to fetch and display movie information from OMDB API
                movieTitle.addEventListener('click', function () {
                    fetchMovieDataFromOMDB(movie.title);
                });

                movieElement.appendChild(moviePoster);
                movieElement.appendChild(movieTitle);

                movieContainer.appendChild(movieElement);


            });
        }
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
    }
}

// This function fetches and display movie information from OMDB API when a user clicks the title of the upcoming movie releases
async function fetchMovieDataFromOMDB(title) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${omdbApiKey}`);
        const data = await response.json();

        if (data.Response === 'True') {
            // This section handles the OMDB API response to display movie details
            // this section construct URL parameters for movie details
            const params = new URLSearchParams();
            params.set('title', data.Title);
            params.set('year', data.Year);
            params.set('director', data.Director);
            params.set('runtime', data.Runtime);
            params.set('actors', data.Actors);
            params.set('genre', data.Genre);
            params.set('plot', data.Plot);
            params.set('rating', data.imdbRating);
            params.set('poster', data.Poster);

            // This section constructs the URL with parameters for movie_info.html file
            const movieInfoURL = `movie_info.html?${params.toString()}`;

            // This function redirects to the movie_info.html page file to display movie information
            window.location.href = movieInfoURL;
        } else {
            // This setion handles the case when the movie is not found in OMDB
            console.error('Movie not found:', data.Error);
        }
    } catch (error) {
        console.error('Error fetching movie data from OMDB:', error);
    }
}

// This section calls the function to fetch and display upcoming movies when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchUpcomingMovies();
});

// Added an event listener to run the code when the page loads
window.addEventListener('load', function() {
    // this section selects the container element that you want to scroll
    var container = document.querySelector('.movie-scroll-container');
    
    // this sets the initial scroll position to -100% to start at the first movie
    container.scrollLeft = container.scrollWidth;
});

