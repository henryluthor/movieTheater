import React from "react";
import moviePoster from "../images/the-fly-movie-poster MV5BODcxMGMwOGEtMDUxMi00MzE5LTg4YTYtYjk1YjA4MzQxNTNlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg";
// import { Movie } from "../Movie";

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

var movies;
var moviesHTML = [];

const getMovies = async () => {
  console.log("getting movies");

  var responseApi = await fetch("https://localhost:7046/api/Movies");
  movies = await responseApi.json();
  // console.log("movies:");
  // console.log(movies);
  // console.log("first movie:");
  // console.log(movies[0]);
  // console.log("first movie title:");
  // console.log(movies[0].title);

  var moviesArrayLength = movies.length;
  console.log("movies array length:");
  console.log(moviesArrayLength);
  
  for(let i=0; i < moviesArrayLength; i++)
  {
    moviesHTML.push(<p>{movies[i].title}</p>)
  }

  console.log("moviesHTML:");
  console.log(moviesHTML);

  // $("#movieList").append("<p>LISTO</p>")
  
};

getMovies();

const Billboard = () => {
  return (
    <div>
      <div>
        <p>Aqui van los parrafos</p>
        <div id="movieList"></div>
      </div>
      <div>{moviePosters}</div>
    </div>
  );
};

export default Billboard;
