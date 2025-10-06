import React from "react";
import companyData from "../companyData.json"

const Header = () => {
  return (
    <div>
      <h1>{companyData.companyName}</h1>
      <a href="/">PAGINA INICIAL</a>
    </div>
  );
};

export default Header;
