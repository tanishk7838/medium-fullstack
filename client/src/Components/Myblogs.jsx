import React from "react";
import Navbar from "./Navbar";
import BlogsCard from "./BlogsCard";
import "./Myblogs.css"
function Myblogs({ blogs }) {
  console.log(blogs);
  return (
    <div>
      <Navbar userId={sessionStorage.getItem("loginId")} />
      <div className="myblog">My Blogs</div>
      {blogs
        .filter((item) => item.authorId === sessionStorage.getItem("loginId"))
        .map((item, index) => {
            return (
                <div>
                    <BlogsCard
                  title={item.title}
                  content={item.content}
                  authId={item.authorId}
                  key={index}
                  date={item.createdAt}
                  blogId = {item.id}
                    />
                </div>
              );
        })}
    </div>
  );
}

export default Myblogs;
