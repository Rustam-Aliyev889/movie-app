import axios from 'axios';

const API_KEY = '57b67400b82bf96090a781188dde651f';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
      const moviesWithPosters = response.data.results.map((movie) => ({
        ...movie,
        posterUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      }));
      return moviesWithPosters;
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

export { fetchMovies };

