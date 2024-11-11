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
  moviearray.push(<p key={i}>{moviesjson[i].title}</p>);
}

const moviePosters = [];
for (let i = 0; i < moviesjson.length; i++) {
  moviePosters.push(
    <div>
      <img
        key={i}
        src={moviePoster}
        alt="movie poster"
        height={300}
        style={{ margin: 10 }}
      ></img>
      <p>Movie title</p>
    </div>
  );
}

const Billboard = () => {
  return (
    <div>
    <button className="btn btn-danger">BOTON DE PRUEBA</button>
      <div className="container">
        <div className="row justify-content-start">
          <div className="col-4">One of two columns</div>
          <div className="col-4">One of two columns</div>
        </div>
        <div className="row justify-content-center">
          <div className="col-4">One of two columns</div>
          <div className="col-4">One of two columns</div>
        </div>
        <div className="row justify-content-end">
          <div className="col-4">One of two columns</div>
          <div className="col-4">One of two columns</div>
        </div>
        <div className="row justify-content-around">
          <div className="col-4">One of two columns</div>
          <div className="col-4">One of two columns</div>
        </div>
        <div className="row justify-content-between">
          <div className="col-4">One of two columns</div>
          <div className="col-4">One of two columns</div>
        </div>
        <div className="row justify-content-evenly">
          <div className="col-4">One of two columns</div>
          <div className="col-4">One of two columns</div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div>
            <img
              className="billboard-poster"
              src={moviePoster}
              alt="movie poster"
            ></img>
            <p>Movie title</p>
          </div>
          <div>
            <img
              className="billboard-poster"
              src={moviePoster}
              alt="movie poster"
            ></img>
            <p>Movie title</p>
          </div>
        </div>
      </div>

      <div>{moviearray}</div>
      <div>{moviePosters}</div>
    </div>
  );
};

export default Billboard;
