// Listens for the entire HTML document to be fully loaded before running the JavaScript code inside
document.addEventListener("DOMContentLoaded", function() {

    // Find the element with the class 'movie-list' and 
    //store a reference to it in the variable movieList (this is the container where the movies are contained)
    //where the movies are displayed on the page
    const movieList = document.querySelector('.movie-list');

    // Find the element with the id 'genreSelect' and store a reference to it in the variable genreSelect
    //this is the id of the genres used in the filter button
    const genreSelect = document.getElementById('genreSelect');

    // Get all elements with the class 'filterDiv' (which are descendants of movieList), convert to an array, and store it in the variable moviesData
    //it contains everything about the movie from name, date, link, poster, etc.
    const moviesData = Array.from(movieList.querySelectorAll('.filterDiv'));

    // Define a function called organizeAndFilter
    function organizeAndFilter() {

        // Get the currently selected genre from genreSelect (the filter that the user interacts with) and store it in the variable genre
        const genre = genreSelect.value;

        // Filter and organize movies
        // Filter the moviesData array to include only movies of the selected genre (or all movies if the genre is "all"), 
        // and sort them by year in descending order, storing the result in the variable filteredMovies
        const filteredMovies = moviesData

            //This line is using the filter method to go through each movie element in the moviesData array
            //For each movie, it checks if either the genre variable is equal to the string "all" or if the movie element has a data-genre attribute that matches the genre variable.
            //If either condition is true, the movie element is kept in the array; otherwise, it's excluded.
            //The result is a new array of movie elements that either includes all movies (if genre is "all") or only the movies of the selected genre.
            .filter(movie => genre === "all" || movie.getAttribute('data-genre') === genre)

            //This line is using the sort method to sort the filtered array of movie elements based on their data-year attributes.
            //The sort method takes a compare function as an argument, which in this case is (a, b) => b.getAttribute('data-year') - a.getAttribute('data-year').
            //In the compare function, a and b represent two movie elements being compared. The function retrieves the data-year attribute from each element, subtracts the data-year of a from b, and returns the result.
            //If the result is positive, b will be placed before a in the array, effectively sorting the array in descending order by the data-year attribute.
            .sort((a, b) => b.getAttribute('data-year') - a.getAttribute('data-year'));

        // Clear the contents of movieList
        //This is done to ensure that the old, unfiltered list of movies is removed from the page before the new, filtered and organized list of movies are displayed
        movieList.innerHTML = '';

        //This is where the seamless year sorting functionaly is created on the page
        // Declare a variable called currentYear, but don't assign a value to it yet
        let currentYear;

        // Iterate over each movie in the filteredMovies array
        filteredMovies.forEach(movie => {

            // Get the year of the current movie and store it in the variable movieYear
            const movieYear = movie.getAttribute('data-year');

            // Check if the year of the current movie is different from the year of the previous movie
            if (movieYear !== currentYear) {

                // If so, update currentYear to the year of the current movie
                currentYear = movieYear;

                // Create a new div element to serve as a header for this year, and set its class to 'year' and its text content to the current year
                const yearHeader = document.createElement('div');
                yearHeader.className = 'year';
                yearHeader.innerText = currentYear;

                // Append the year header to movieList
                movieList.appendChild(yearHeader);
            }

            // Find the element with the class 'movie-genre' within the current movie,
            // and update its text content to the genre of the current movie, capitalizing the first letter
            movie.querySelector('.movie-genre').innerText = movie.getAttribute('data-genre').charAt(0).toUpperCase() + movie.getAttribute('data-genre').slice(1);

            // Append the current movie to movieList
            movieList.appendChild(movie);
        });
    }

    // Add an event listener to genreSelect that will call organizeAndFilter whenever the selected genre changes
    genreSelect.addEventListener('change', organizeAndFilter);

    // Call organizeAndFilter to set up the initial state of the page
    organizeAndFilter();  // Initialize on page load
});

