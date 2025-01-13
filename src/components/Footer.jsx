import React from "react";

const packageJson = require("../../package.json");
const reactVersion = packageJson.dependencies.react.substring(1);

const Footer = () => {
  return <div>
    <div>Developed by Henry Acevedo in React {reactVersion}</div>
    <div>This product uses the TMDB API but is not endorsed or certified by TMDB.</div>
  </div>;
};

export default Footer;
