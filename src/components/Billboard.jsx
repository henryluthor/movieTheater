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

var movies = await fetch("https://localhost:7046/api/Movies");
var moviesjson = await movies.json();
// console.log("moviesjson:");
// console.log(moviesjson);
// console.log("first movie:");
// console.log(moviesjson[0]);
// console.log("first movie title:");
// console.log(moviesjson[0].title);
var moviearray = [];
for (let i = 0; i < moviesjson.length; i++) {
  moviearray.push(<p key={i}>{moviesjson[i].title}</p>);
}

const Billboard = () => {
  return (
    <div>
      <div>
        <img
          src={moviePoster}
          alt="movie poster"
          height={300}
          style={{ margin: 10 }}
        ></img>
      </div>
      <div>{moviearray}</div>
      <div>{moviePosters}</div>
    </div>
  );
};

export default Billboard;
