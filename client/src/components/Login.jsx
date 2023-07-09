import React from "react";
import { useState } from "react";
import backendURL from "../utils/backendUrl";
import PasswordAndConfirmPasswordValidation from "../utils/PasswordAndConfirmPasswordValidation";
const Login = ({ setLoginShow }) => {
  const [loginBox, setLoginBox] = useState(1);
  const handleShow = (e) => {
    try {
      setLoginShow(e);
    } catch (error) {}
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
            {loginBox === 3 ? <h2>Sign Up</h2> : <h2>Log In</h2>}
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
                <input
                  className="element log_sign"
                  type="text"
                  placeholder="Username"
                />
                <PasswordAndConfirmPasswordValidation type={loginBox} />
                <button className="btn_login">
                  {loginBox === 2 ? <p>Log In</p> : <p>Sign Up</p>}
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
