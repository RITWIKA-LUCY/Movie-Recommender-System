// Event listener for search button click
document.getElementById("searchButton").addEventListener("click", function () {
    const query = document.getElementById("searchInput").value;
    if (query) {
        fetchMovies(query);
    }
});

// Fetch movies based on the search query
function fetchMovies(query) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Display the list of movies
function displayMovies(movies) {
    const movieContainer = document.getElementById("movieContainer");
    movieContainer.innerHTML = ""; // Clear previous results

    movies.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie-card");
        movieElement.dataset.movieId = movie.id; // Attach movie ID

        const movieImage = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image";

        const releaseDate = movie.release_date || 'N/A';
        const rating = movie.vote_average || 'N/A';
        const overview = movie.overview
            ? movie.overview.substring(0, 100) + '...'
            : 'No overview available.';

        movieElement.innerHTML = `
            <div class="movie-card-front">
                <img class="movie-poster" src="${movieImage}" alt="${movie.title}">
                <div class="movie-title">${movie.title}</div>
            </div>
            <div class="movie-card-back">
                <div class="movie-details">
                    <p><strong>Release Date:</strong> ${releaseDate}</p>
                    <p><strong>Rating:</strong> ${rating}</p>
                    <p><strong>Description:</strong> ${overview}</p>
                </div>
            </div>
        `;

        movieContainer.appendChild(movieElement);
    });
}

// Event listener for clicks on movie cards and close button
document.addEventListener("click", function (event) {
    if (event.target.closest(".movie-card")) {
        const movieId = event.target.closest(".movie-card").dataset.movieId;
        fetchMovieDetails(movieId);
    }

    if (event.target.classList.contains("close")) {
        closeModal();
    }
});

// Fetch detailed information about a movie by ID
function fetchMovieDetails(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            displayMovieDetails(data);
        })
        .catch(error => console.error("Error fetching movie details:", error));
}

// Display the detailed movie information in a modal
function displayMovieDetails(movie) {
    const modal = document.getElementById("movieModal");
    const modalContent = document.getElementById("modalMovieContent");

    const movieImage = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/200x300?text=No+Image";

    const movieDetailsHTML = `
        <img class="modal-movie-poster" src="${movieImage}" alt="${movie.title}">
        <h2 class="modal-movie-title">${movie.title}</h2>
        <p class="modal-movie-details"><strong>Release Date:</strong> ${movie.release_date}</p>
        <p class="modal-movie-details"><strong>Rating:</strong> ${movie.vote_average}</p>
        <p class="modal-movie-description"><strong>Description:</strong> ${movie.overview}</p>
        <p class="modal-movie-details"><strong>Genres:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>
    `;

    modalContent.innerHTML = movieDetailsHTML;
    modal.style.display = "flex";
}

// Close the modal
function closeModal() {
    const modal = document.getElementById("movieModal");
    modal.style.display = "none";
}


    