import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchMovies } from './api';
import MoviesList from './MoviesList';
import InfiniteScroll from 'react-infinite-scroll-component'; // Library 4 infinite scrolling
function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortByRating, setSortByRating] = useState(false); // State for sorting

  const fetchMoreData = () => {
    // Function to load more movies
    fetchMovies(page + 1).then((data) => {
      setMovies([...movies, ...data]);
      setPage(page + 1);
    });
  };

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies(data);
    });
  }, []);

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

  return (
    <div className="App">
      <header className='header'>
        <h1>Movie Database</h1>
      </header>
      <button onClick={toggleSort}>
        {sortByRating ? 'Sort by Rating (High to Low)' : 'Sort by Rating (Low to High)'}
      </button>
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


