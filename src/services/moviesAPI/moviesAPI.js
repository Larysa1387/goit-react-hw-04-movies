const KEY = "b7646d842be1fcad85234a90ca8db2ea";
const BASE_URL = "https://api.themoviedb.org/3";

// function fetchMovies() {
//   return fetch(
//     `
// https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=horror&language=en-US&page=1&include_adult=false`
//   ).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(new Error("There is no data"));
//   });
// }
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

// function fetchMovies() {
//   return fetch(
//     `${BASE_URL}/trending/movie/day?api_key=${KEY}&language=en-US&page=1&include_adult=false`
//   ).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(new Error("There is no data"));
//   });
// }
// const api = { fetchMovies };

// export default api;

// https://api.themoviedb.org/3/trending/all/day?api_key=b7646d842be1fcad85234a90ca8db2ea&query=horror&language=en-US&page=1&include_adult=false
