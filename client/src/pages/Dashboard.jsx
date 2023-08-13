import Bar from "../components/Bar";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import backendURL from "../utils/backendUrl";
import Skeleton from "../components/Skeleton";
import { useParams } from "react-router-dom";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;
function Dashboard() {
  const [data, setData] = useState();
  const params = useParams();
  const user_id = params.user_id;
  useEffect(() => {
    document.title = "Dashboard";

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/dashboard/${user_id}`,
          {
            withCredentials: true,
          }
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user_id]);
  if (!data) {
    return <Skeleton />;
  }
  return (
    <div>
      <Header />
      <Bar />
      <UserProfile user={data.user} blogs={data.blogs} />
    </div>
  );
}

export default Dashboard;
