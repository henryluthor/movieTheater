import React from "react";
import TMDBLogo from "../images/Asset 4.svg"

const Footer = () => {
  return (
    <div>
      <img src={TMDBLogo} alt="TMDB Logo" style={{width: 100}}></img>
      <div>This product uses the TMDB API but is not endorsed or certified by TMDB.</div>
  </div>
  )
};

export default Footer;
