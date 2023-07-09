import React, { useEffect } from "react";
import { useToast } from "@hanseo0507/react-toast";

const Skeleton = ({ msg }) => {
  const { toast } = useToast();
  useEffect(() => {
    if (msg) toast.error(msg);
  }, []);
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
