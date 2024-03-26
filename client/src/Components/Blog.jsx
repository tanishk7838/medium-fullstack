import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./Blog.css"
function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [author, setAuthor] = useState();
  useEffect(() => {
    axios
      .get(
        "https://backend.varshneytanishk7838.workers.dev/api/v1/blog/" + id,
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setBlog(res.data);
        axios
          .get(
            "https://backend.varshneytanishk7838.workers.dev/api/v1/user/" +
              res.data.authorId,
            {
              headers: {
                Authorization: sessionStorage.getItem("token"),
              },
            }
          )
          .then((res) => setAuthor(res.data.user));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
        {author && <Navbar userId={sessionStorage.getItem("loginId")}/>}
      {blog && author &&(
        <div className="blog-user-container">
          <div className="blog-part">
            <div>{blog.title}</div>
            <div>Posted at {blog.createdAt.split("T")[0]}</div>
            <div>{blog.content}</div>
          </div>
          <div className="author-part">
            <div className="name">Author</div>
            <div className="avatar">
                <div>{author.name[0]}</div>
                <div>{author.name}</div>
            </div>
            <div>{author.email}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
