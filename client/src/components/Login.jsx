import React from "react";
import { useState } from "react";
import backendURL from "../utils/backendUrl";
import PasswordAndConfirmPasswordValidation from "../utils/PasswordAndConfirmPasswordValidation";
import axios from "axios";
import { useGlobalContext } from "../context";
import { Toast, useToast } from "@hanseo0507/react-toast";

const Login = ({ setLoginShow }) => {
  const [loginBox, setLoginBox] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { saveUser } = useGlobalContext();
  const { toast } = useToast();
  const handleShow = (e) => {
    try {
      setLoginShow(e);
    } catch (error) {}
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    const user = { username: username, password: password };
    console.log(user);
    axios
      // .post(`${backendURL}/api/auth/signin`, user, { withCredentials: true })
      .post(`http://localhost/api/auth/signin`, user, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.user) {
          saveUser(res.data.user);
          localStorage.setItem("token", res.data.token);
          toast.success("Login Success!");
          // window.location.href = `/`;
        } else toast.error("Login Failed!");
      })
      // .get(`http://localhost/api/blogs`, { withCredentials: true })
      // .then((res) => {
      //   axios
      //     .post(`http://localhost/api/auth/signin`, user, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log(res);
      //       localStorage.setItem("token", res.data.token);
      //       window.location.href = "/";
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      //   // window.location.href = "/";
      // })
      .catch((err) => {
        console.log(err);
        toast.error("Login Failed!");
      });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if (username === "" || username.length < 6) {
      toast.error("Invalid username");
      return;
    }
    if (password === "") {
      toast.error("Please enter a password");
      return;
    }

    const user = {
      username: username,
      password: password,
      email: email,
    };
    console.log(user);
    axios
      .post(`http://localhost/api/auth/signup`, user)
      .then((res) => {
        console.log(res);
        window.location.href = "/";
        if ((res.status = 201)) toast.success("Sign Up Success!");
        else toast.error("Sign Up Failed!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* {loginBox != 0 && ( */}
      <div className="theme">
        <div className="login_box">
          <div className="login_header">
            <i
              className="bx bx-x-circle btn_close"
              onClick={() => handleShow(false)}
            ></i>
            {loginBox === 3 ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
            {loginBox > 1 && (
              <i
                className="bx bx-chevron-left btn_back"
                onClick={() => setLoginBox(1)}
              ></i>
            )}
          </div>
          <div className="login_body">
            {loginBox === 1 && (
              <>
                <div className="element" onClick={() => setLoginBox(2)}>
                  <i className="bx bxs-user"></i>
                  <h5>Use username</h5>
                </div>
                <div
                  className="element"
                  onClick={() => {
                    window.location.href = `${backendURL}/auth/google/callback`;
                  }}
                >
                  <i className="bx bxl-google"></i>
                  <h5>Continue with Google</h5>
                </div>
                <div className="element">
                  <i className="bx bxl-facebook-circle"></i>
                  <h5>Continue with Facebook</h5>
                </div>
              </>
            )}

            {loginBox > 1 && (
              <>
                {loginBox === 3 ? (
                  <input
                    className="element log_sign"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <> </>
                )}
                <input
                  className="element log_sign"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <PasswordAndConfirmPasswordValidation
                  type={loginBox}
                  setPassword={setPassword}
                />
                <button
                  className="btn_login"
                  onClick={(e) =>
                    loginBox === 2 ? handleSignIn(e) : handleSignUp(e)
                  }
                >
                  {loginBox === 2 ? <p>Sign In</p> : <p>Sign Up</p>}
                </button>
              </>
            )}
          </div>
          <div className="login_footer">
            Don't have an account?{" "}
            <div className="btn_signup" onClick={() => setLoginBox(3)}>
              Sign up
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
export default Login;
