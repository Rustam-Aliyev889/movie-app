import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchMovies, } from './api';
import MoviesList from './MoviesList';
import InfiniteScroll from 'react-infinite-scroll-component'; // Library 4 infinite scrolling
import GenreFilter from './GenreFilter'; 

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortByRating, setSortByRating] = useState(false); // State for sorting
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetchMovies(page, sortByRating, selectedGenres).then((data) => {
      setMovies(data);
    });
  }, [page, sortByRating, selectedGenres]);
  
  const fetchMoreData = () => {
    setPage(page + 1);
  };

  const toggleSort = () => {
    setSortByRating(!sortByRating);
    // Sort the movies based on rating
    const sortedMovies = [...movies];
    if (sortByRating) {
      sortedMovies.sort((a, b) => b.vote_average - a.vote_average); // Sort in descending order
    } else {
      sortedMovies.sort((a, b) => a.vote_average - b.vote_average); // Sort in ascending order
    }
    setMovies(sortedMovies);
  };

  const handleGenreFilterChange = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
    setPage(1); // Resets the page to 1 when changing genres
  };

  return (
    <div className="App">
      <h1>Movie Database</h1>
      <button onClick={toggleSort}>
        {sortByRating ? 'Sort by Rating (High to Low)' : 'Sort by Rating (Low to High)'}
      </button>
      <GenreFilter onFilterChange={handleGenreFilterChange} />
      <InfiniteScroll
        dataLength={movies.length} // To prevent infinite rendering
        next={fetchMoreData} // Function to load more data
        hasMore={true} // Indicates whether more data can be loaded
        loader={<h4>Loading...</h4>} // Loader component while loading
      >
        <MoviesList movies={movies} />
      </InfiniteScroll>
    </div>
  );
}

export default App;



