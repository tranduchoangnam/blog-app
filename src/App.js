import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Error, Dashboard } from "./pages/index.js";
import { useGlobalContext } from "./context";
import Skeleton from "./components/Skeleton";
import Login from "./components/Login";
function App() {
  const { user, isLoading } = useGlobalContext();
  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/"></Navigate>}
        ></Route>
        <Route exact path="/login/success" element={<Dashboard />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
