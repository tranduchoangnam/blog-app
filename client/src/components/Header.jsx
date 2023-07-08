import React from "react";
import logo from "../assets/blog.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../context";
import Login from "./Login";
const Header = () => {
  const { user, logoutUser } = useGlobalContext();
  const [toggleLog, setToggleLog] = useState(false);
  const [loginShow, setLoginShow] = useState(false);
  const [prev, setPrev] = useState("/");
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(e);
    if (e === prev) navigate(0);
    setPrev(e);
  };
  return (
    <div className="wrapper">
      <div className="brand" onClick={() => handleClick("/")}>
        <img src={logo} alt="logo" />
        <h4>Blogee</h4>
      </div>
      <div className="search_box">
        <input type="text" placeholder="Search..." />
        <div className="search_icon">
          <i className="bx bx-search"></i>
        </div>
      </div>
      <div className="log">
        {user ? (
          <img
            className="user_avatar"
            src={user.photo}
            alt="avatar"
            onClick={() => setToggleLog(!toggleLog)}
          />
        ) : (
          <button onClick={() => setLoginShow(true)} className="btn_login">
            Log in
          </button>
        )}
        {loginShow && <Login setLoginShow={setLoginShow} />}
        {toggleLog && (
          <div className="log_list">
            <div
              className="element"
              onClick={() => handleClick(`/dashboard/${user.id}`)}
            >
              <i className="bx bxs-user"></i>
              <p>View profile</p>
            </div>
            <div
              className="element log_out"
              onClick={() => {
                logoutUser();
                navigate("/");
                setToggleLog(!toggleLog);
              }}
            >
              <i className="bx bx-log-out"></i>
              <p>Log out</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
