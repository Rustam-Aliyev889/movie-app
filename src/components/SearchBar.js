import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearchSubmit} >
      <input 
        className="search-bar"
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button className='search-btn' type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
