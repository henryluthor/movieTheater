import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import companyData from '../companyData.json';
import "./MovieDetails.css";


const MovieDetails = () => {
    const {id} = useParams();
    const movie = useLoaderData();

  return (
    <div>
      {/* THIS IS MOVIE DETAILS AND THE MOVIE ID IS
      <p>{id}</p> */}

      <div className='MovieDetailsTitle'>{movie.data.title}</div>

      {/* if there is movie runtime show it */}
      {movie.data.runtime != null && <div className='FeatureDetailMovie'>{movie.data.runtime}</div>}

      {/* another way to achieve previous block */}
      {/* {movie.data.runtime != null ? <div className='FeatureDetailMovie'>{movie.data.runtime}</div>: null} */}

      {/* if there is movie genre show it */}
      {movie.data.genre != null && <div className='FeatureDetailMovie'>{movie.data.genre}</div>}
    </div>
  );
}

export default MovieDetails;

//loader function
export const MovieDetailsLoader = async ({params}) => {
    const {id} = params;
    const resp = await fetch(companyData.API_URL + "/" + id );
    return resp.json();
}
