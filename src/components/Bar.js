import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useGlobalContext } from "../context";
const Bar = () => {
  //   const { user, logoutUser } = useGlobalContext();
  const [prev, setPrev] = useState("/");

  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(e);
    if (e === prev) navigate(0);
    setPrev(e);
  };
  return (
    <div className="wrapper_left">
      <div className="Home" onClick={() => handleClick("/")}>
        <i className="bx bxs-home"></i>
        <p>Home</p>
      </div>
      <div className="Following" onClick={() => handleClick("/")}>
        <i className="bx bxs-heart"></i>
        <p>Following</p>
      </div>
      <div className="Explore" onClick={() => handleClick("/")}>
        <i className="bx bxs-compass"></i>
        <p>Explore</p>
      </div>
      <div className="Post" onClick={() => handleClick("/upload")}>
        <i className="bx bxs-message-add"></i>
        <p>Post</p>
      </div>
    </div>
  );
};

export default Bar;
