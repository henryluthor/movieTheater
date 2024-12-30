import React from "react";
import moviePoster from "../images/the-fly-movie-poster MV5BODcxMGMwOGEtMDUxMi00MzE5LTg4YTYtYjk1YjA4MzQxNTNlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg";
import "./Billboard.css";
import companyData from "../companyData.json";
import { Link } from "react-router-dom";
// import { Movie } from "../Movie";

// var movies = await fetch("https://localhost:7046/api/Movies");
var movies = await fetch(companyData.API_URL);
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
      <Link to={"/Movie/" + moviesjson[i].id}>{moviesjson[i].title}</Link>
    </div>
  );
}

const Billboard = () => {
  return (
    <div className="container">
      <div>{moviearray}</div>
    </div>
  );
};


export default Billboard;
