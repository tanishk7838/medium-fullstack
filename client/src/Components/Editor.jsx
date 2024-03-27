import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Editor.css";
import axios from "axios";
import { useParams } from "react-router-dom";
function Editor() {
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    content: "",
    authorId: sessionStorage.getItem("loginId"),
  });
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios
        .get(
          "https://backend.varshneytanishk7838.workers.dev/api/v1/blog/" + id,
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) =>
          setBlogDetails({
            ...blogDetails,
            title: res.data.title,
            content: res.data.content,
          })
        )
        .catch((err) => console.log(err));
    }
  }, []);
  const handleClick = () => {
    if (blogDetails.title.length == 0) {
      alert("Please enter title");
    } else if (blogDetails.content.length == 0) {
      alert("Please enter content");
    } else {
      if (!id) {
        axios
          .post(
            "https://backend.varshneytanishk7838.workers.dev/api/v1/blog",
            blogDetails,
            {
              headers: {
                Authorization: sessionStorage.getItem("token"),
              },
            }
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        setBlogDetails({
          title: "",
          content: "",
        });
      } else {
        axios
          .put(
            "https://backend.varshneytanishk7838.workers.dev/api/v1/blog",
            {
              id: id,
              title: blogDetails.title,
              content: blogDetails.content,
            },
            {
              headers: {
                Authorization: sessionStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            alert("Blog Updated")
          })
          .catch((err) => console.log(err));
      }
    }
  };
  return (
    <div>
      <Navbar userId={sessionStorage.getItem("loginId")} />
      <div className="editor-container">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) =>
            setBlogDetails({ ...blogDetails, title: e.target.value })
          }
          value={blogDetails.title}
        />
        <textarea
          type="textarea"
          placeholder="Tell your story..."
          rows={20}
          onChange={(e) =>
            setBlogDetails({ ...blogDetails, content: e.target.value })
          }
          value={blogDetails.content}
        />
        <div>
          <button onClick={handleClick}>Publish</button>
        </div>
      </div>
    </div>
  );
}

export default Editor;
