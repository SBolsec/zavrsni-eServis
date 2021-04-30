import React from 'react'

const InfoCard = ({title, content, icon}) => {
  return (
    <div className="bg-white text-dark p-3 d-flex justify-content-between h-100">
      <div>
        <h5 className="font-weight-bold text-uppercase">
          {title}
        </h5>
        <p>
          {content}
        </p>
      </div>
      <div className="d-flex align-items-center">
        <span className="fas fa-stack fa-2x">
          <i className="fas fa-circle fa-stack-2x text-lightBlue"></i>
          <i className={icon + " fa-stack-1x text-blueAccent"}></i>
        </span>
      </div>
    </div>
  );
}

export default InfoCard;