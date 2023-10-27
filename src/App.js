import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchMovies } from './api';
import MoviesList from './MoviesList';
import InfiniteScroll from 'react-infinite-scroll-component'; // Library 4 infinite scrolling

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

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

  return (
    <div className="App">
      <h1>Movie Database</h1>
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


