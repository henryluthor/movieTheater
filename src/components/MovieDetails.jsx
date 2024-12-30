import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import companyData from '../companyData.json';



const MovieDetails = () => {
    const {id} = useParams();
    const movie = useLoaderData();

  return (
    <div>
      THIS IS MOVIE DETAILS AND THE MOVIE ID IS
      <p>{id}</p>
      <p>{movie.data.title}</p>
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
