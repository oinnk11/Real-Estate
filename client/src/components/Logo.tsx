import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ classname }) => {
  return (
    <Link to="/">
      <img className={classname} src="logo.png" />
    </Link>
  );
};

export default Logo;
