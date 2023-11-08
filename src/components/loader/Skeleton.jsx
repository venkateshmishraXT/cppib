import React from "react";
import './Skeleton.css';

const Skeleton = ({ width }) => {
  return (
    <div className="skeleton" style={{ width: width }}></div>
  );
};

export default Skeleton;
