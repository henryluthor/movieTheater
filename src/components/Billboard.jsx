import React from "react";
import moviePoster from "../images/the-fly-movie-poster MV5BODcxMGMwOGEtMDUxMi00MzE5LTg4YTYtYjk1YjA4MzQxNTNlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg";
import "./Billboard.css";
import companyData from "../companyData.json";
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
console.log("estos son los id:");
for (let i = 0; i < moviesjson.length; i++) {
  console.log(moviesjson[i].id);
  moviearray.push(
    <div>
      <img
        id={moviesjson[i].id}
        className="billboard-poster"
        src={moviePoster}
        alt="movie poster"
        onClick={(event) => {
          var posterClickedId = event.target.id;
          GetMovieById(posterClickedId);
        }}
      ></img>
      <p key={i}>{moviesjson[i].title}</p>
    </div>
  );
}

const Billboard = () => {
  return (
    <div className="container">
      <div className="form">
        <label htmlFor="movieId" className="form-label">
          Movie Id
        </label>
        <input id="movieIdInput" type="text" className="form-control"></input>
        
        <button
          type="button"
          className="btn btn-success"
          onClick={(event) => {
            var x = parseInt(document.getElementById("movieIdInput").value);
            GetMovieById(x);
          }}
        >
          Search
        </button>
      </div>

      <div>{moviearray}</div>
    </div>
  );
};


async function GetMovieById(id) {  
  var movie = await fetch(companyData.API_URL + "/" + id);
  var moviejson = await movie.json();
  console.log("API response:");
  if(moviejson.data == null)
  {
    console.log("The data in moviejson is null.");
  }
  else
  {
    console.log(moviejson.data);
    console.log("movie id:");
  }
}

export default Billboard;
