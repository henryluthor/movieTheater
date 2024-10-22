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
var movieArray3 = [];
var res;

fetch("https://localhost:7046/api/Movies")
  .then((response) => response.json())
  .then((responsejson) => {
    // console.log(responsejson);
    var responseArrayLength = responsejson.length;

    var movie = new Movie();
    var movieArray = [];
    for (let i = 0; i < responseArrayLength; i++) {
      // console.log(responsejson[i].title);
      movie.title = responsejson[i].title;
      movieArray.push(movie);
      movieArray2.push(<p key={"pMovieTitle" + i}>{movie.title}</p>);
    }
    // console.log("movieArray:");
    // console.log(movieArray);
    console.log("movieArray2:");
    console.log(movieArray2);
    console.log("moviePosters:");
    console.log(moviePosters);
  });

async function getMovies() {
  //una linea
  return await fetch("https://localhost:7046/api/Movies")
    .then((response) => response.json())
    .then((responsejson) => {
      res = responsejson;
    });
}

const Billboard = () => {
  return (
    <div>
      <div>
        <p>Aqui van los parrafos</p>
        {/* <div>{movieArray2}</div> */}
        <div>{res}</div>
      </div>
      <div>{moviePosters}</div>
    </div>
  );
};

export default Billboard;
