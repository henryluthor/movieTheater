import defaultPoster from "../images/default_poster.jpg";
import companyData from "../companyData.json";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const BillboardV2 = () => {

  const [movies, setMovies] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect( () => {
    const fetchMovies = async () => {
      try{
        var movies = await fetch(companyData.API_URL);
        var moviesJson = await movies.json();
        console.log("response:");
        console.log(moviesJson);
        setMovies(moviesJson);
      }
      catch(error){
        console.error(error.message);
        setErrorMessage(error.message);
      }
      finally{
        setIsloading(false);
      }
    }

    fetchMovies();
  }, []);

  return(
    <>
    {errorMessage || isLoading ? (
      <div>
        {errorMessage || 
        <div>
          <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border" aria-hidden="true"></span>
            <span role="status">Loading...</span>
          </button>
        </div>}
      </div>
      ) : (
      movies.map((movie) => (
        <p>{movie.title}</p>
      ))
    )}
    </>
  );
};

export default BillboardV2;
