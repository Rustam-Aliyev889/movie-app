import axios from 'axios';

const API_KEY = '57b67400b82bf96090a781188dde651f';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (page, sortByRating = false, selectedGenres = []) => {
    try {
      let apiUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}`;
      
      if (sortByRating) {
        apiUrl += '&sort_by=vote_average.desc'; 
      }
      
      if (selectedGenres.length > 0) {
        apiUrl += `&with_genres=${selectedGenres.join(',')}`; // genre filtering
      }
      
      const response = await axios.get(apiUrl);
      
      const moviesWithPosters = response.data.results.map((movie) => ({
        ...movie,
        posterUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      }));
      
      return moviesWithPosters;
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };
  

export { fetchMovies, fetchGenres };

