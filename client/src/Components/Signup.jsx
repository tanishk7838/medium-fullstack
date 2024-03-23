import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate()
  const handleClick = () => {
    axios
      .post(
        "https://backend.varshneytanishk7838.workers.dev/api/v1/user/singup",
        userInput
      )
      .then((res) => {
        console.log(res)
        sessionStorage.setItem('token', res.data.jwt)
        navigate("/signin")
      })
      .catch((err) => alert(err.response.data));
    setUserInput({
      email: "",
      password: "",
      name: "",
    });
  };
  return (
    <div className="signup-container">
      <div className="signup-container-left">
        <p>Create an account</p>
        <p>
          Already have an account? <a onClick={()=>navigate("/signin")}>Login</a>
        </p>
        <div className="signup-form">
          <div>
            <label>Name{"(optional)"}</label>
            <input
              type="name"
              placeholder="Enter your name"
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
              value={userInput.name}
            />
          </div>
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
          <button onClick={handleClick}>Sign Up</button>
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

export default Signup;
