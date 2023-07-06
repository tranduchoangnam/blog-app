import React from "react";

const Skeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-loading-header"></div>
      <div className="skeleton-loading-content"></div>
      <div className="skeleton-loading-content"></div>
      <div className="skeleton-loading-content"></div>
    </div>
  );
};

export default Skeleton;
