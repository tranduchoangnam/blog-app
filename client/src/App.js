import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Dashboard,
  ProtectedRoute,
  UploadPage,
  FullBlogPage,
  Following,
  History,
} from "./pages/index.js";
import { useGlobalContext } from "./context";
import Skeleton from "./components/Skeleton";
import Login from "./components/Login";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const { user, saveUser, fetchUser, isLoading, setIsLoading } =
    useGlobalContext();
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      saveUser(JSON.parse(storedUser));
      setIsLoading(false);
    } else fetchUser();
  }, []);
  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/blog/:blog_id" element={<FullBlogPage />}></Route>
        <Route path="/dashboard/:user_id" element={<Dashboard />}></Route>
        <Route
          path="/following"
          element={
            <ProtectedRoute>
              <Following />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/login/success"
          element={
            <ProtectedRoute>
              <Navigate
                to={user ? `/dashboard/${user.id}` : "/"}
                replace="true"
                element={<Dashboard />}
              ></Navigate>
            </ProtectedRoute>
          }
        ></Route>
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
