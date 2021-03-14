import React from 'react'

const Divider = ({width}) => {
  if (!width) width = 75;

  return (
    <div className="d-flex justify-content-center my-3">
      <div className="divider pt-1 bg-homeHighlight" style={{ width: `${width}px` }}></div>
    </div>
  );
}
 
export default Divider;