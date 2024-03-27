import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Icon from "./Icon";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Navbar({userId}) {
  const [name, setName]= useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get("https://backend.varshneytanishk7838.workers.dev/api/v1/user/"+userId)
      .then(res=>setName(res.data.user.name))
      .catch(err=>console.log(err))
  }, [userId])
  return (
    <div className="nav-container">
      <div className="left">
        <div>
          <Icon />
        </div>
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z"
              fill="currentColor"
            ></path>
          </svg>
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="right">
        <div onClick={()=>navigate("/editor")}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-label="Write"
          >
            <path
              d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
              fill="currentColor"
            ></path>
            <path
              d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
              stroke="currentColor"
            ></path>
          </svg>
          Write
        </div>
        <div onClick={()=>navigate("/myblogs")}>{name[0]}</div>
      </div>
    </div>
  );
}

export default Navbar;
