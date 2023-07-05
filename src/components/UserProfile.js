import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
const UserProfile = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <div className="wrapper_right">
      <div className="user_profile">
        <div className="user_avatar">
          <img src={user.photo} alt="" />
        </div>
        <div className="user_info">
          <div className="user_account">
            <h3>{user.email ? user.email : user.id}</h3>
          </div>
          <div className="user_name">{user.name}</div>
          <button className="btn_edit" onClick={() => navigate("/edit")}>
            Edit Profile
          </button>
        </div>
      </div>
      <div className="blog"></div>
    </div>
  );
};

export default UserProfile;
