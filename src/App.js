import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchMovies, } from './components/api';
import MoviesList from './components/MoviesList';
import InfiniteScroll from 'react-infinite-scroll-component'; // Library 4 infinite scrolling
import GenreFilter from './components/GenreFilter'; 
import WatchLaterList from './components/WatchLaterList';
import ScrollToTopButton from './components/backToTheTop';

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortByRating, setSortByRating] = useState(false); // State for sorting
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [watchLaterList, setWatchLaterList] = useState([]);


  useEffect(() => {
    fetchMovies(page, sortByRating, selectedGenres).then((data) => {
      setMovies(data);
    });
  }, [page, sortByRating, selectedGenres]);

  useEffect(() => {
    //Use effect to load the watch later list from local storage
    const storedList = localStorage.getItem('watchLaterList');
    if (storedList) {
      setWatchLaterList(JSON.parse(storedList));
    }
  }, []);
  
  
  const fetchMoreData = async () => {
    try {
      const newMovies = await fetchMovies(page, sortByRating, selectedGenres);
      if (newMovies.length > 0) {
        setMovies([...movies, ...newMovies]);
        setPage(page + 1); // Increment the page number for the next request
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
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

  const addToWatchLater = (movie) => {
    if (!watchLaterList.some((item) => item.id === movie.id)) {
      const updatedList = [...watchLaterList, { ...movie, posterUrl: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }];
      setWatchLaterList(updatedList);
  
      // To save the list to local storage
      localStorage.setItem('watchLaterList', JSON.stringify(updatedList));
    }
  };
  

  const removeFromWatchLater = (movie) => {
    const updatedWatchLaterList = watchLaterList.filter((item) => item.id !== movie.id);
    setWatchLaterList(updatedWatchLaterList);
  
    //To update local storage with the updated list
    localStorage.setItem('watchLaterList', JSON.stringify(updatedWatchLaterList));
  };
  

  return (
    <div className="App">
      <h1>Movie Database</h1>
      <GenreFilter onFilterChange={handleGenreFilterChange} />
      <WatchLaterList watchLaterList={watchLaterList} onRemoveFromWatchLater={removeFromWatchLater} />
      <button className='sort-btn' onClick={toggleSort}>
      {sortByRating ? 'Sort by Rating (High to Low)' : 'Sort by Rating (Low to High)'}
        </button>
      <InfiniteScroll
        dataLength={movies.length} // To prevent infinite rendering
        next={fetchMoreData} // Function to load more data
        hasMore={true} // Indicates whether more data can be loaded
        loader={<h4>Loading...</h4>} // Loader component while loading
      >
        <MoviesList movies={movies} onAddToWatchLater={addToWatchLater} />
        <ScrollToTopButton />
      </InfiniteScroll>
    </div>
  );
}

export default App;



