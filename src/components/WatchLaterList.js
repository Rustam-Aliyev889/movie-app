import React, { useState } from 'react';

const WatchLaterListItem = ({ movie, onRemoveFromWatchLater }) => (
  <div className='movie-wl' key={movie.id}>
    <div className="movie-item">
      <img src={movie.posterUrl} alt={movie.title} />
      <button onClick={() => onRemoveFromWatchLater(movie)}>X</button>
    </div>
    <p className='wll-title'>{movie.title}</p>
  </div>
);

const WatchLaterList = ({ watchLaterList, onRemoveFromWatchLater }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="watch-later-list">
      <h2 className='wll-name'>
        Watch Later
      </h2>
      <div className="movies-w-l-l">
        {watchLaterList.slice(0, isCollapsed ? 5 : undefined).map((movie) => (
          <WatchLaterListItem key={movie.id} movie={movie} onRemoveFromWatchLater={onRemoveFromWatchLater} />
        ))}
        {watchLaterList.length > 5 && (
          <button className='wll-button' onClick={toggleCollapse}>
            {isCollapsed ? 'Show' : 'Hide'}
          </button>
        )}
      </div>
    </div>
  );
};

export default WatchLaterList;
