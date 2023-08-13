import Bar from "../components/Bar";
import FullBlog from "../components/FullBlog";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import backendURL from "../utils/backendUrl";
import Skeleton from "../components/Skeleton";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;
function FullBlogPage() {
  const params = useParams();
  const blog_id = params.blog_id;
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/get_blog/${blog_id}`,
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
  }, []);
  return (
    <div>
      <Header />
      <Bar />
      {data ? (
        <FullBlog
          key={data.blog.id}
          data={data}
          type={{ preview: false, enable: true }}
        />
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default FullBlogPage;
