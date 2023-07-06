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
          <div className="container_grid">
            <Blog
              title="so so lead alsjdfkljaslkdjfkasjkflasjdkf"
              imgSrc="https://picsum.photos/200/100"
            />
            <Blog title="so so lead" imgSrc="https://picsum.photos/200/100" />
            <Blog title="so so lead" imgSrc="https://picsum.photos/200/100" />
            <Blog title="so so lead" imgSrc="https://picsum.photos/200/100" />
            <Blog title="so so lead" imgSrc="https://picsum.photos/200/100" />
            <Blog title="so so lead" imgSrc="https://picsum.photos/200/100" />
            <Blog title="so so lead" imgSrc="https://picsum.photos/200/100" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
