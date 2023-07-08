import React from "react";
import { useGlobalContext } from "../context";
import EditProfile from "./EditProfile";
import BlogList from "./BlogList";
import { useState } from "react";
const UserProfile = ({ user, blogs }) => {
  // const { user } = useGlobalContext();
  const { showEdit, setShowEdit } = useState(false);

  return (
    <>
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
            <button className="btn_edit" onClick={() => setShowEdit(true)}>
              Edit Profile
            </button>
          </div>
        </div>
        <BlogList blogs={blogs} preview={true} />
      </div>
      {showEdit && <EditProfile setShowEdit={setShowEdit} />}
    </>
  );
};

export default UserProfile;
