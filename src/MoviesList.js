import React from 'react';

const MoviesList = ({ movies, onAddToWatchLater }) => {
  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <div className="movie" key={movie.id}>
          <div className="movie-info">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              onClick={() => onAddToWatchLater(movie)}
            />
            <div className="hover-text" onClick={() => onAddToWatchLater(movie)}>Click to add to watch later</div>
            <h3 className="title">{movie.title}</h3>
            <p className="movie-overview">{movie.overview}</p>
            <button onClick={() => onAddToWatchLater(movie)}>Add to Watch Later</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;

