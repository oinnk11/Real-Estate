import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Logo = ({ classname }) => {
  return (
    <Link to="/">
      <img className={classname} src={logo} />
    </Link>
  );
};

export default Logo;
