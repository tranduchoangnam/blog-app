import Bar from "../components/Bar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import backendURL from "../utils/backendUrl";
import Skeleton from "../components/Skeleton";
import axios from "axios";
import BlogList from "../components/BlogList";
import { useGlobalContext } from "../context";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;
function Home() {
  const [data, setData] = useState();
  const { user } = useGlobalContext();
  useEffect(() => {
    document.title = "Blogee";
    console.log(user);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/home`, {
          withCredentials: true,
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (!data) {
    return <Skeleton />;
  }
  return (
    <>
      {/* {user && <Navigate to="/dashboard" replace={true} />} */}
      <div>
        <Header />
        <Bar />
        <div className="wrapper_right">
          <BlogList blogs={data} type={{ preview: true, enable: true }} />
        </div>
      </div>
    </>
  );
}

export default Home;
