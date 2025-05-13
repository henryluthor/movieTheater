import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import companyData from '../companyData.json';
import "./MovieDetails.css";
import defaultPoster from "../images/default_poster.jpg"


const MovieDetails = () => {
  
  const movie = useLoaderData();

  const [posterUrl, setPosterUrl] = useState('');

  useEffect(() => {
    const fetchPoster = async () => {
      if(movie.data.imdbid)
      {
        try{
          const response = await fetch("https://api.themoviedb.org/3/find/" + movie.data.imdbid + "?external_source=imdb_id&api_key=b044b7f581ea2e1e91131d95a553ec1f");
          const responseJson = await response.json();
          setPosterUrl("https://image.tmdb.org/t/p/original" + responseJson.movie_results[0].poster_path);
        }
        catch(error){
          console.error("Error fetching poster: ", error);
        }       
      }
      else
      {
        setPosterUrl(defaultPoster);
      }
    };

    fetchPoster();
  }, [movie.data.imdbid]);

  

  return (

    <div>      

      <div className='MovieDetailsTitle'>{movie.data.title}</div>

      {/* if there is movie runtime show it */}
      {movie.data.runtime != null && <div className='FeatureDetailMovie'>{movie.data.runtime}</div>}

      {/* another way to achieve previous block */}
      {/* {movie.data.runtime != null ? <div className='FeatureDetailMovie'>{movie.data.runtime}</div>: null} */}

      {/* if there is movie genre show it */}
      {movie.data.genre != null && <div className='FeatureDetailMovie'>{movie.data.genre}</div>}
      
      <img className='poster' src={posterUrl} alt='movie poster'></img>
      
    </div>
  );
}

export default MovieDetails;

//loader function
export const MovieDetailsLoader = async ({params}) => {
    const {id} = params;
    const resp = await fetch(companyData.API_URL + "/" + id );
    var respJson = await resp.json();

    // return resp.json();
    return respJson;
}
