const KEY = "b7646d842be1fcad85234a90ca8db2ea";

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

function fetchMovies() {
  return fetch(
    `
https://api.themoviedb.org/3//trending/movie/day?api_key=${KEY}&language=en-US&page=1&include_adult=false`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error("There is no data"));
  });
}
const api = { fetchMovies };

export default api;

// https://api.themoviedb.org/3/trending/all/day?api_key=b7646d842be1fcad85234a90ca8db2ea&query=horror&language=en-US&page=1&include_adult=false
