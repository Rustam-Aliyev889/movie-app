import React from 'react';

const Movie = ({ movie }) => (
  <div className="movie">
    <div className="movie-content">
      <img src={movie.posterUrl} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
    </div>
  </div>
);

export default Movie;


