import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
const EditProfile = ({ setShowEdit }) => {
  const { user } = useGlobalContext();
  const handleShowEdit = (e) => {
    setShowEdit(e);
  };

  return (
    <div className="theme">
      <div className="wrapper_edit">
        <div className="user_avatar">
          <img src={user.photo} alt="" />
        </div>
        <div className="user_info">
          <div className="user_account">
            <h3>{user.email ? user.email : user.id}</h3>
          </div>
          <div className="user_name">{user.name}</div>
          <i
            className="bx bx-x-circle btn_close"
            onClick={() => handleShowEdit(false)}
          ></i>
        </div>
      </div>
      <div className="blog"></div>
    </div>
  );
};

export default EditProfile;
