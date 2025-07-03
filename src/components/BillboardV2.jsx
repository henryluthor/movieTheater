import companyData from "../companyData.json";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import defaultPoster from "../images/default_poster.jpg";
import "./Billboard.css";

const BillboardV2 = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        var movieArray = [];
        var moviesFromAPI = await fetch(companyData.API_URL);
        var moviesFromAPIJson = await moviesFromAPI.json();

        // For each movie fetch poster
        for (let i = 0; i < moviesFromAPIJson.length; i++) {
          var movieFromTMDB;
          var movieFromTMDBJson;
          var movieResults;
          var posterPath;

          if (moviesFromAPIJson[i].imdbid != null) {
            try {
              // Fetch movie poster
              movieFromTMDB = await fetch(
                "https://api.themoviedb.org/3/find/" +
                  moviesFromAPIJson[i].imdbid +
                  "?external_source=imdb_id&api_key=b044b7f581ea2e1e91131d95a553ec1f"
              );
              movieFromTMDBJson = await movieFromTMDB.json();
              movieResults = movieFromTMDBJson.movie_results[0];
              posterPath =
                "https://image.tmdb.org/t/p/original" +
                movieResults.poster_path;
            } catch (error) {
              // Could not fetch movie poster, set posterPath to defaultPoster
              console.error(
                "An error ocurred while fetching " +
                  moviesFromAPIJson[i].title +
                  " poster. " +
                  error.message
              );
              posterPath = defaultPoster;
            }
          } else {
            // imdbid is null, set posterPath to defaultPoster
            posterPath = defaultPoster;
          }

          movieArray.push(
            <>
              <img
                className="billboard-poster"
                src={posterPath}
                alt="movie poster"
              ></img>
              <a href={"/Movie/" + moviesFromAPIJson[i].id}>
                {moviesFromAPIJson[i].title}
              </a>
              {/* <Link to={"/Movie/" + moviesFromAPIJson[i].id}>{moviesFromAPIJson[i].title}</Link> */}
            </>
          );
        }
        setMovies(movieArray);
      } catch (error) {
        console.error(
          "An error ocurred while fetching movies. " + error.message
        );
        setErrorMessage(
          "An error ocurred while fetching movies. " + error.message
        );
      } finally {
        setIsloading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {errorMessage || isLoading ? (
        <div>
          {errorMessage || (
            <div>
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="row">
          {movies.map((movie, index) => (
            <div key={index} className="col-md-3 col-sm-6">
              {movie}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BillboardV2;
