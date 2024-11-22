import React from "react";
import moviePoster from "../images/the-fly-movie-poster MV5BODcxMGMwOGEtMDUxMi00MzE5LTg4YTYtYjk1YjA4MzQxNTNlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg";
import "./Billboard.css";
// import { Movie } from "../Movie";



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
  moviearray.push(
    <div>
      <img
        className="billboard-poster"
        src={moviePoster}
        alt="movie poster"
      ></img>
      <p key={i}>{moviesjson[i].title}</p>
    </div>
  );
}

const Billboard = () => {  
  return (
    <div className="container">
      
      <div className="form">
        <label htmlFor="movieId" className="form-label">Movie Id</label>
        <input id="movieId" type="text" className="form-control"></input>
        <button type="button" className="btn btn-primary" onClick={GetMovieById}>
          Search
        </button>
        <button type="button" className="btn btn-success" onClick={() => {GetMovieByIdV2(1)}}>Search v2</button>
      </div>

      <div>{moviearray}</div>
    </div>
  );
};

function GetMovieById()
{
  console.log("This is the function GetMovieById")
}

const GetMovieByIdV2 = (id) => {
  console.log("The id received by this function is:");
  console.log(id);
}

export default Billboard;
