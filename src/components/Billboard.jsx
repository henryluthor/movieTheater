import React from "react";
import defaultPoster from "../images/default_poster.jpg";
import "./Billboard.css";
import companyData from "../companyData.json";
import { Link } from "react-router-dom";

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
  var movieFromTMDB;
  var movieFromTMDBJson;
  var movieResults;
  var posterPath;
  // check if current movie in the response array has set its IMDB id to set posterPath
  if (moviesjson[i].imdbId != null) 
  {
    movieFromTMDB = await fetch(
      "https://api.themoviedb.org/3/find/" +
        moviesjson[i].imdbId +
        "?external_source=imdb_id&api_key=b044b7f581ea2e1e91131d95a553ec1f");
    movieFromTMDBJson = await movieFromTMDB.json();    
    movieResults = movieFromTMDBJson.movie_results[0];
    posterPath = "https://image.tmdb.org/t/p/original" + movieResults.poster_path;
  }
  else
  {
    posterPath = defaultPoster;
  }
  

  moviearray.push(
    <div>
      <img className="billboard-poster" src={posterPath} alt="movie poster"></img>
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
