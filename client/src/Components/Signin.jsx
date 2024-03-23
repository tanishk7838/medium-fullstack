import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleClick = () => {
    axios
      .post(
        "https://backend.varshneytanishk7838.workers.dev/api/v1/user/singin",
        userInput
      )
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("token", res.data.jwt);
      })
      .catch((err) => alert(err.response.data));
    setUserInput({
      email: "",
      password: "",
    });
  };
  return (
    <div className="signup-container">
      <div className="signup-container-left">
        <p>Login into your account.</p>
        <p>
          Don't have an account?{" "}
          <a onClick={() => navigate("/signup")}>Signup</a>
        </p>
        <div className="signup-form">
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter you email"
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
              value={userInput.email}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
              value={userInput.password}
            />
          </div>
          <button onClick={handleClick}>Sign In</button>
        </div>
      </div>
      <div className="signup-container-right">
        <p>
          "The customer service i recieved was exceptional. The support team
          went above and beyond to address my concerns."
        </p>
        <p>Jules Winnfield</p>
        <p>CEO, Acme Incc</p>
      </div>
    </div>
  );
}

export default Signin;
