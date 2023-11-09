import React, { useState, useEffect } from 'react';
import { fetchGenres } from './api';

const GenreFilter = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetchGenres().then((data) => {
      setGenres(data);
    });
  }, []);

  const handleGenreChange = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];
    setSelectedGenres(updatedGenres);
    onFilterChange(updatedGenres);
  };

  const handleRemoveGenre = (genreId) => {
    const updatedGenres = selectedGenres.filter((id) => id !== genreId);
    setSelectedGenres(updatedGenres);
    onFilterChange(updatedGenres);
  };

  return (
    <div className="genre-filter">
      <div className="genre-list">
        {genres.map((genre) => (
          <label key={genre.id} className={`genre-label${selectedGenres.includes(genre.id) ? ' checked' : ''}`}>
            <input
              type="checkbox"
              value={genre.id}
              checked={selectedGenres.includes(genre.id)}
              onChange={(e) => handleGenreChange(parseInt(e.target.value, 10))}
            />
            {genre.name}
          </label>
        ))}
      </div>
      <h3 className='selected-genres-title'>Selected Genres:</h3>
      <div className="selected-genres">
          {selectedGenres.map((genreId) => (
            <p className='genre-name' key={genreId}>
              {genres.find((genre) => genre.id === genreId).name}
              <button className='genre-remove-btn' onClick={() => handleRemoveGenre(genreId)}>x</button>
            </p>
          ))}
      </div>
    </div>
  );
};

export default GenreFilter;


