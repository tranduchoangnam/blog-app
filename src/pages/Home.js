import Bar from "../components/Bar";
import Header from "../components/Header";
import Blog from "../components/Blog";

function Home() {
  return (
    <>
      {/* {user && <Navigate to="/dashboard" replace={true} />} */}
      <div>
        <Header />
        <Bar />
        <div className="wrapper_right">
          <Blog />
        </div>
      </div>
    </>
  );
}

export default Home;
