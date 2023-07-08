import React from "react";
import TextEditor from "./TextEditor";
import TagsInput from "./TagsInput";
import FullBlog from "./FullBlog";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import backendURL from "../utils/backendUrl";
import { useToast } from "@hanseo0507/react-toast";
import Blog from "./Blog";
const UploadPost = () => {
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
    const request = new XMLHttpRequest();
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios
      .post(`${backendURL}/api/upload`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    if (!photo) {
      setUrl(undefined);
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

            <button className="btn_post" onClick={() => submitForm()}>
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

        <Blog title={title} imgSrc={url} preview={true} />
        <Blog title={title} content={contentData} preview={false} />
      </div>
    </>
  );
};
export default UploadPost;
