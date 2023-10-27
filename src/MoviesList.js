import React from 'react';
import Movie from './Movie';

const MoviesList = ({ movies }) => (
  <div className="movies-list">
    {movies.map((movie) => (
      <Movie key={movie.id} movie={movie} />
    ))}
  </div>
);

export default MoviesList;
