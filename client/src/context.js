import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import backendURL from "./utils/backendUrl";
import Cookies from "js-cookie";

const UserContext = React.createContext();
const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/current_user`, {
        withCredentials: true,
      });
      saveUser(data);
      Cookies.set("user", JSON.stringify(data));

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
      await axios.delete(`${backendURL}/logout`, { withCredentials: true });
      removeUser();
      Cookies.remove("user");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      saveUser(JSON.parse(storedUser));
      setIsLoading(false);
    } else fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        isLoading,
        saveUser,
        fetchUser,
        user,
        logoutUser,
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
