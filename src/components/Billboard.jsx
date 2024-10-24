import React from "react";
import moviePoster from "../images/the-fly-movie-poster MV5BODcxMGMwOGEtMDUxMi00MzE5LTg4YTYtYjk1YjA4MzQxNTNlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg";
import { Movie } from "../Movie";

const moviePosters = [];
for (let i = 0; i < 7; i++) {
  moviePosters.push(
    <img
      key={i}
      src={moviePoster}
      alt="movie poster"
      height={300}
      style={{ margin: 10 }}
    ></img>
  );
}

var movieArray2 = [];
var movieClassArray = [];

fetch("https://localhost:7046/api/Movies")
  .then((response) => response.json())
  .then((responsejson) => {
    console.log("responsejson:");
    console.log(responsejson);
    var responseArrayLength = responsejson.length;
    console.log("Longitud del array:");
    console.log(responseArrayLength);

    for (let i = 0; i < responseArrayLength; i++) {
      console.log(responsejson[i].title);
      movieArray2.push(responsejson[i].title);
    }
    console.log("movieArray2");
    console.log(movieArray2);

    for (let i = 0; i < responseArrayLength; i++) {
      var movie = new Movie();
      movie.title = movieArray2[i];
      movieClassArray.push(movie);
    }
    console.log("movieClassArray:");
    console.log(movieClassArray);
  });

// async function getMovies() {
//   return await fetch("https://localhost:7046/api/Movies")
//     .then((response) => response.json())
//     .then((responsejson) => {
//       res = responsejson;
//     });
// }

const Billboard = () => {
  return (
    <div>
      <div>
        <p>Aqui van los parrafos</p>
      </div>
      <div>{moviePosters}</div>
    </div>
  );
};

export default Billboard;
