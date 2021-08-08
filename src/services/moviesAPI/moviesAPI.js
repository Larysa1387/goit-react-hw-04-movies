const KEY = "b7646d842be1fcad85234a90ca8db2ea";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchRequest(url = "" /*, config = {}*/) {
  const response = await fetch(url /*, config*/);
  return response.ok
    ? response.json()
    : Promise.reject(new Error("There is no data"));
}

export function fetchTrendingMovies() {
  return fetchRequest(
    `${BASE_URL}/trending/movie/day?api_key=${KEY}&language=en-US&page=1&include_adult=false`
  );
}

export function fetchMovieDetailes(movieId) {
  return fetchRequest(
    `${BASE_URL}/movie/${movieId}?api_key=${KEY}&language=en-US`
  );
}

export function fetchMoviesOnQuery(searchQuery) {
  return fetchRequest(
    `${BASE_URL}/search/movie?api_key=${KEY}&query=${searchQuery}&language=en-US&page=1&include_adult=false`
  );
}

export function fetchMovieCast(movieId) {
  return fetchRequest(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${KEY}&language=en-US`
  );
}

export function fetchMovieReviews(movieId) {
  return fetchRequest(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${KEY}&language=en-US`
  );
}
