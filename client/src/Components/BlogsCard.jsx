import React, { useEffect, useState } from "react";
import "./BlogCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BlogsCard({ authId, title, content, date, blogId }) {
  const [user, setUser] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(
        "https://backend.varshneytanishk7838.workers.dev/api/v1/user/" + authId
      )
      .then((res) => setUser(res.data.user))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="blog-container">
      <div className="header">
        <div>{user && user.name[0]}</div>
        <div>
          {user && user.name}
          {", "}
        </div>
        <div>{date.split("T")[0]}</div>
      </div>
      <div className="title" onClick={()=>navigate("/blogs/"+blogId)}>{title}</div>
      <div className="content">
        {content.length > 200 ? content.slice(0, 200) + "..." : content}
      </div>
      <div className="time">
        <div>{Math.ceil(content.length / 100)}
        {" mins read"}</div>
        {authId === sessionStorage.getItem("loginId") && <button onClick={()=>navigate("/blogs/edit/"+blogId)}>...</button>}
      </div>
      
    </div>
  );
}

export default BlogsCard;
