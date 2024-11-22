import React from "react";
import companyData from "../companyData.json"


const MovieInfo = () => {
  return (
    <div className="container">
      <h2>MOVIE INFORMATION</h2>
      <div className="form">
        <label htmlFor="movieId" className="form-label">
          Movie Id
        </label>
        <input id="movieIdInput" type="text" className="form-control"></input>
        <button
          type="button"
          className="btn btn-primary"
          onClick={getMovieById}
        >
          Search
        </button>
      </div>
    </div>
  );
};

var movieSelectedId;
var movieSelected;
var movieSelectedJson;

async function getMovieById()
{
    console.log("This is getmoviebyid");
    movieSelectedId = document.getElementById("movieIdInput").value;
    console.log("movieSelectedId:");
    console.log(movieSelectedId);
    // console.log("query this URL:");
    // console.log(companyData.API_URL + "/" + movieSelectedId);

    movieSelected = await fetch(companyData.API_URL + "/" + movieSelectedId);
    movieSelectedJson = await movieSelected.json();

    // console.log("movieSelectedJson:");
    // console.log(movieSelectedJson);
    console.log("movieSelectedJson data:");
    console.log(movieSelectedJson.data);
    console.log("movieSelectedJson data title:");
    console.log(movieSelectedJson.data.title);
}

export default MovieInfo;
