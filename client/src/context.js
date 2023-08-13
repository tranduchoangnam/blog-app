import axios from "axios";
import React, { useContext, useState } from "react";
import backendURL from "./utils/backendUrl";
import Cookies from "js-cookie";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
const UserContext = React.createContext();
const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/current_user`, {
        withCredentials: true,
      });
      saveUser(data.user);
      Cookies.set("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log("1");
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      removeUser();
      await axios.delete(`${backendURL}/auth/signout`, {
        withCredentials: true,
      });
      Cookies.remove("user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoading,
        saveUser,
        fetchUser,
        user,
        logoutUser,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(UserContext);
};

export { UserProvider };
