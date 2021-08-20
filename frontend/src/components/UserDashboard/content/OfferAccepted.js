import React, { useEffect } from "react";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom';

const OfferAccepted = () => {
    const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 5000);
  }, []);

  return (
    <div className="d-flex" style={{ height: "65vh" }}>
      <div className="d-flex flex-column justify-content-center align-items-center bg-white flex-grow-1">
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="bg-white text-blueAccent fa-5x"
        />
        <h5 className="pt-3">Ponuda prihvaćena</h5>
        <p>Servis je obaviješten o prihvaćenoj ponudi</p>
      </div>
    </div>
  );
};

export default OfferAccepted;
