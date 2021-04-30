import Button from "react-bootstrap/esm/Button";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar bg="darkGray" className="px-0 text-white sticky-top">
      <div className="brand-wrapper ml-3 ml-sm-5 my-auto">
        <Link to="/">
          <img src="/images/e-servis_white.png" alt="logo" style={{height: '25px'}} className="my-auto" />
        </Link>
      </div>
      <Link to="/login" className="ml-auto mr-3 mr-sm-5 my-auto">
        <Button variant="blueAccent" className="text-white button-round">PRIJAVI SE</Button>
      </Link>
    </Navbar>
  );
}

export default MyNavbar;