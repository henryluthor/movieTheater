import React from "react";

const packageJson = require("../../package.json");
const reactVersion = packageJson.dependencies.react.substring(1);

const Footer = () => {
  return <div>Developed by Henry Acevedo in React {reactVersion}</div>;
};

export default Footer;
