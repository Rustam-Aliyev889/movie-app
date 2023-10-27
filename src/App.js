import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchMovies } from './api';
import MoviesList from './MoviesList';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies(data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Movie App</h1>
      <MoviesList movies={movies} />
    </div>
  );
}

export default App;

