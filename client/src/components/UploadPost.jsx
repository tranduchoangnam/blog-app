import React from "react";
import TextEditor from "./TextEditor";
import TagsInput from "./TagsInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backendURL from "../utils/backendUrl";
import { useToast } from "@hanseo0507/react-toast";
import Blog from "./Blog";
import { useGlobalContext } from "../context";

const UploadPost = () => {
  const { user } = useGlobalContext();
  const [contentData, setContentData] = useState("");
  const [title, setTitle] = useState("");
  const [tagsData, setTagsData] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [url, setUrl] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const submitForm = () => {
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }
    if (contentData === "") {
      toast.error("Please enter content");
      return;
    }
    if (tagsData.length === 0) {
      toast.error("Please enter tags");
      return;
    }
    if (photo === null) {
      toast.error("Please upload a cover photo");
      return;
    }
    var formData = new FormData();
    formData.append("title", title);
    formData.append("content", contentData);
    formData.append("tags", tagsData);
    formData.append("photo", photo);
    // const request = new XMLHttpRequest();
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    axios
      .post(`${backendURL}/api/upload`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setContentData("");
        setTitle("");
        setTagsData([]);
        setPhoto(null);
        toast.success("Post uploaded successfully");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        toast.error("Post uploaded failed");
        console.error(error);
      });
  };
  useEffect(() => {
    if (!photo) {
      setUrl(undefined);
      console.log(url);
      return;
    }

    const objectUrl = URL.createObjectURL(photo);
    setUrl(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <>
      <div className="wrapper_post">
        <div className="container_post">
          <div className="title">
            <input
              type="text"
              placeholder="Title"
              onBlur={(e) => setTitle(e.target.value)}
            />

            <button
              className="btn_post"
              onClick={() => {
                submitForm();
              }}
            >
              Post
            </button>
          </div>
          <span className="cover_photo title">
            Get Started with a cover photo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </span>
          <TagsInput setTagsData={setTagsData} />
          <div className="text_editor">
            <TextEditor setContentData={setContentData} />
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
        </div>
        <Blog
          data={{
            blog: {
              title: title,
              photo: url,
            },
            owner: user,
          }}
          type={{ preview: true, enable: false }}
        />
      </div>
    </>
  );
};
export default UploadPost;
