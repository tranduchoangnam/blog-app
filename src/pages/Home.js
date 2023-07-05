import Bar from "../components/Bar";
import Header from "../components/Header";
import Main from "../components/Main";

function Home() {
  return (
    <>
      {/* {user && <Navigate to="/dashboard" replace={true} />} */}
      <div>
        <Header />
        <Bar />
        <Main />
      </div>
    </>
  );
}

export default Home;
