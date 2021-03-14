import Button from "react-bootstrap/esm/Button";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar bg="darkGray" className="px-0 text-white sticky-top" style={{height: '8vh'}}>
      <div className="brand-wrapper ml-3 ml-sm-5 my-auto">
        <Link to="/">
          <img src="/images/logo.svg" alt="logo" className="logo" />
        </Link>
      </div>
      <Link to="/login" className="ml-auto mr-3 mr-sm-5 my-auto">
        <Button variant="blueAccent" className="text-white button-round">PRIJAVI SE</Button>
      </Link>
    </Navbar>
  );
}

export default MyNavbar;