import React from "react";
import companyData from "../companyData.json";
import React_Logo from "../images/React_Logo_SVG.svg";
import "./Header.css";

const packageJson = require("../../package.json");
const reactVersion = packageJson.dependencies.react.substring(1);

const Header = () => {
  return (
    <div>
      <div className="devinfo">
        <img src={React_Logo} style={{height: 50}} alt="react poster"></img>
        <p style={{margin: 10}}>Developed by Henry Acevedo in React {reactVersion}</p>
      </div>
      <h1>{companyData.companyName}</h1>
      <a href="/">PAGINA INICIAL</a>
    </div>
  );
};

export default Header;
