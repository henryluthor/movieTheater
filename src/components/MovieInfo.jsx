import React from "react";
import CompanyData from "../companyData.json";

var movieSelectedId;

movieSelectedId = 1;

var movieSelected = await fetch(CompanyData.API_URL + "/" + movieSelectedId);
var movieSelectedJson = await movieSelected.json();

const MovieInfo = () => {
  return (
    <div className="container">
      <h2>MOVIE INFORMATION</h2>
      <p>In this page I have to show the information of the selected movie.</p>
      <p>This is the selected movie:</p>
      {/* <pre>{JSON.stringify(movieSelectedJson)}</pre> */}
      {Object.entries(movieSelected).map(([key, value]) => 
        <p>
          {key} : {value}
        </p>
      )}
      {/* {movieSelectedJson} */}
    </div>
  );
};

export default MovieInfo;
