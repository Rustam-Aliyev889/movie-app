import axios from 'axios';

const API_KEY = '57b67400b82bf96090a781188dde651f';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

export { fetchMovies };