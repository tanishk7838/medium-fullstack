import React, { useEffect, useState } from "react";
import BlogsCard from "./BlogsCard";
import Navbar from "./Navbar";
import axios from "axios";
function Blogs() {
  const [data, setData] = useState();
  const [id, setId] = useState()
  useEffect(() => {
    axios
      .get("https://backend.varshneytanishk7838.workers.dev/api/v1/blog/bulk", {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setId(res.data.id)
        sessionStorage.setItem("loginId", res.data.id)
        setData(res.data.blogs)})
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Navbar userId={id}/>
      {data &&
        data.map((item, index) => {
          return (
            <BlogsCard
              title={item.title}
              content={item.content}
              authId={item.authorId}
              key={index}
              date={item.createdAt}
              blogId = {item.id}
            />
          );
        })}
    </div>
  );
}

export default Blogs;
