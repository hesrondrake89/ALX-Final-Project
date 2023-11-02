const tmdbApiKey = 'fc90ff78fa17b85bf5bcbdd19e6c16c5'; 
const omdbApiKey = '8a8cd539'; 

// this is the function to fetch and display movie data from the OMDB API
async function fetchMovieData(title) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${omdbApiKey}`);
        const data = await response.json();

        if (data.Response === 'False') {
            document.getElementById('movieData').innerHTML = `<p>${data.Error}</p>`;
        } else {
            // constructs URL parameters for movie details
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

            // constructs URL with parameters for movie_info.html
            const movieInfoURL = `movie_info.html?${params.toString()}`;

            // redirects to the movie.info.html page
            window.location.href = movieInfoURL;
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

// this is the function to fetch and display upcoming movies from TMDb API
async function fetchUpcomingMovies() {
    try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}&language=en-US&page=1`);
    const data = await response.json();

    if (data.results) {
        const movieContainer = document.querySelector('.movie-container');
        movieContainer.innerHTML = ''; // Clear existing content

        // this creates an array to hold movie elements
        const movieElements = data.results.map(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'movie';

            const moviePoster = document.createElement('img');
            moviePoster.src = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`;
            moviePoster.alt = movie.title;

            const movieTitle = document.createElement('p');
            movieTitle.textContent = movie.title;
            movieTitle.style.cursor = 'pointer';

            // this section adds a click event to the movie title to fetch and display movie information from OMDB API
            movieTitle.addEventListener('click', function () {
                fetchMovieDataFromOMDB(movie.title);
            });

            movieElement.appendChild(moviePoster);
            movieElement.appendChild(movieTitle);

            return movieElement;
        });

        // this section appends all movie elements to the container
        movieElements.forEach(movieElement => {
            movieContainer.appendChild(movieElement.cloneNode(true));
        });
    }

    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
    }
}

// this section calls the function to fetch and display upcoming movies when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchUpcomingMovies();
});

// search button click event lister
document.getElementById('fetchButton').addEventListener('click', () => {
    const movieTitle = document.getElementById('movieTitleInput').value;

    // this checks if the input is empty
    if (!movieTitle) {
        // displays an error message when the input is empty and user clicks search
        const errorMessage = 'Title is required. Please enter a movie or series title.';
        document.getElementById('errorMessage').textContent = errorMessage;
    } else {
        // clears previous error message
        document.getElementById('errorMessage').textContent = '';
        // calls the function to fetch movie data
        fetchMovieData(movieTitle);
    }
});

// this is the function to fetch and display upcoming movies from TMDb API
async function fetchUpcomingMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}&language=en-US&page=1`);
        const data = await response.json();

        if (data.results) {
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = ''; // this clears exisiting content

            data.results.slice(0, 30).forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.className = 'movie';

                const moviePoster = document.createElement('img');
                moviePoster.src = `https://image.tmdb.org/t/p/w185/${movie.poster_path}`;
                moviePoster.alt = movie.title;

                const movieTitle = document.createElement('p');
                movieTitle.textContent = movie.title;
                movieTitle.style.cursor = 'pointer';

                // this adds a click event to the movie title to fetch and display movie information from OMDB API
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

// this is the function to fetch and display movie information from OMDB API
async function fetchMovieDataFromOMDB(title) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${omdbApiKey}`);
        const data = await response.json();

        if (data.Response === 'True') {
            // section handles the OMDB API response to display movie details
            // constructs the URL parameters for movie details
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

            // constructs the URL with parameters for movie_info.html
            const movieInfoURL = `movie_info.html?${params.toString()}`;

            // this section redirects to the movie_info.html page to display movie information
            window.location.href = movieInfoURL;
        } else {
            // section handles the case when the case when the movie is not found in OMDB
            console.error('Movie not found:', data.Error);
        }
    } catch (error) {
        console.error('Error fetching movie data from OMDB:', error);
    }
}

// this even listener calls the function to fetch and display upcoming movies when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchUpcomingMovies();
});

// adds an event listener to run the code when the page loads
window.addEventListener('load', function() {
    // selects the container element that you want to scroll
    var container = document.querySelector('.movie-scroll-container');
    
    // this sets the initial scroll position to -100% to start at the first movie
    container.scrollLeft = container.scrollWidth;
});

// this is the function to fetch movie suggestions from TMDB based on the user input search
async function fetchMovieSuggestions(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${query}`);
        const data = await response.json();

        if (data.results) {
            // this function displays the movie suggestions in a dropdown
            const dropdown = document.getElementById('suggestionDropdown');
            dropdown.innerHTML = ''; // this clears existing suggestions

            data.results.forEach(movie => {
                const suggestion = document.createElement('div');
                suggestion.textContent = movie.title;
                suggestion.className = 'suggestion';

                // handles the click event for the suggestion
                suggestion.addEventListener('click', function () {
                    // redirects to the movie_info page with the selected movie's details
                    redirectToMovieInfoPage(movie.id);
                });

                dropdown.appendChild(suggestion);
            });
        }
    } catch (error) {
        console.error('Error fetching movie suggestions:', error);
    }
}

// this listens for input changes in the search field
const searchInput = document.getElementById('movieTitleInput');
searchInput.addEventListener('input', function () {
    const query = searchInput.value;

    if (query) {
        fetchMovieSuggestions(query);
    } else {
        // clears the dropdown if the search input is empty
        const dropdown = document.getElementById('suggestionDropdown');
        dropdown.innerHTML = '';
    }
});

// function to redirect to the movie_info page with movie details
function redirectToMovieInfoPage(movieId) {
    // section contructs the URL for the movie_info page with the movie ID
    const movieInfoURL = `movie_info.html?id=${movieId}`;
    // redircts to the movie_info page
    window.location.href = movieInfoURL;
}

document.getElementById('movieTitleInput').addEventListener('input', function () {
    const inputText = this.value;

    // sections clears previous suggestions
    document.getElementById('suggestions').innerHTML = '';

    if (inputText) {
        // fetches movie suggestions based on the user input search
        fetchMovieSuggestions(inputText);
    }
});

// this is the Function to fetch movie suggestions
async function fetchMovieSuggestions(inputText) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&language=en-US&query=${inputText}&page=1`);
        const data = await response.json();

        if (data.results) {
            const suggestionsList = document.getElementById('suggestions');
            data.results.forEach(movie => {
                const suggestionItem = document.createElement('li');
                suggestionItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w92/${movie.poster_path}" alt="${movie.title}"><span>${movie.title}</span>`;
                suggestionItem.addEventListener('click', function () {
                    // when a suggestion is clicked, fill the input field and clear suggestions
                    document.getElementById('movieTitleInput').value = movie.title;
                    suggestionsList.innerHTML = '';
                });
                suggestionsList.appendChild(suggestionItem);
            });
        }
    } catch (error) {
        console.error('Error fetching movie suggestions:', error);
    }
}


// functoion to fetch and display tv series airing today using TMDB API
async function fetchAiringTodayTVSeries() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${tmdbApiKey}&language=en-US&page=1`);
        const data = await response.json();

        if (data.results) {
            const tvAiringTodayContainer = document.getElementById('tv-airing-today-container'); // tagrts the new section
            tvAiringTodayContainer.innerHTML = ''; // clears existing content

            data.results.forEach(tv => {
                const tvElement = createSeriesElement(tv);
                tvAiringTodayContainer.appendChild(tvElement);
            });
        }
    } catch (error) {
        console.error('Error fetching airing today TV series:', error);
    }
}


// this event listener calls the function to fetch and display tv series airing today when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchAiringTodayTVSeries();
});

function createSeriesElement(tv) {
    // this crates a series container div
    const seriesElement = document.createElement('div');
    seriesElement.className = 'tv';

    // this creates an image element for the TV series poster and apply the "tv-poster" class
    const seriesPoster = document.createElement('img');
    seriesPoster.src = `https://image.tmdb.org/t/p/w185/${tv.poster_path}`;
    seriesPoster.alt = tv.name;
    seriesPoster.className = 'tv-poster'; // this section applies the "tv-poster" class

    // cretes a div element for the TV series title container
    const titleContainer = document.createElement('div');
    titleContainer.className = 'tv-title-container';

    // creates a paragraph element for the TV series title
    const seriesTitle = document.createElement('p');
    seriesTitle.textContent = tv.name;
    seriesTitle.style.cursor = 'pointer';
    seriesTitle.className = 'tv-title'; // Apply the "tv-title" class

    // adds a click event to the tv series title to fetch and display tv series information from OMDB API
    seriesTitle.addEventListener('click', function () {
        fetchSeriesDataFromOMDB(tv.name);
    });

    // section appends the title to the title container
    titleContainer.appendChild(seriesTitle);

    // section appends the elements to the series container
    seriesElement.appendChild(seriesPoster);
    seriesElement.appendChild(seriesTitle);

    return seriesElement;
}

// this is the function to fetch TV series information from OMDB API
async function fetchSeriesDataFromOMDB(title) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${omdbApiKey}`);
        const data = await response.json();

        if (data.Response === 'True') {
            // contructs the URL parameters for TV series details
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

            // contructs the URL with parameters for movie_info.html
            const movieInfoURL = `movie_info.html?${params.toString()}`;

            // redirects to the movie_info.html page to display TV series information
            window.location.href = movieInfoURL;
        } else {
            // handles the case when the TV series is not found in OMDB
            console.error('TV series not found:', data.Error);
        }
    } catch (error) {
        console.error('Error fetching TV series data from OMDB:', error);
    }
}

