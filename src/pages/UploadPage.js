import Header from "../components/Header";
import UploadPost from "../components/UploadPost";
function UploadPage() {
  return (
    <>
      {/* {user && <Navigate to="/dashboard" replace={true} />} */}
      <div>
        <Header />
        <UploadPost />
      </div>
    </>
  );
}

export default UploadPage;
