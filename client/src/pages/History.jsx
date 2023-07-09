import Bar from "../components/Bar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import backendURL from "../utils/backendUrl";
import Skeleton from "../components/Skeleton";
import axios from "axios";
import BlogList from "../components/BlogList";

function History() {
  const [data, setData] = useState();

  useEffect(() => {
    document.title = "Blogee";

    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/history`, {
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
    // toast.error("OMG you have not read any blogs yet!");
    return <Skeleton />;
  }
  return (
    <>
      {/* {user && <Navigate to="/dashboard" replace={true} />} */}
      <div>
        <Header />
        <Bar />
        <div className="wrapper_right">
          {data.length === 0 ? (
            <Skeleton msg="OMG you have not read any blogs yet! Let's read now :>" />
          ) : (
            <BlogList blogs={data} type={{ preview: true, enable: true }} />
          )}
        </div>
      </div>
    </>
  );
}

export default History;
