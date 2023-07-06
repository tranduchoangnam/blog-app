import React from "react";
import TextEditor from "./TextEditor";
import TagsInput from "./TagsInput";
import { useState } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import backendURL from "../utils/backendUrl";
import { useToast } from "@hanseo0507/react-toast";

const UploadPost = () => {
  const [contentData, setContentData] = useState("");
  const [showData, setShowData] = useState(false);
  const [title, setTitle] = useState("");
  const [tagsData, setTagsData] = useState([]);
  const { toast } = useToast();

  const handleData = (dirtyHTML) => {
    const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
      USE_PROFILES: { html: true },
    });
    return cleanHTML;
  };

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
    var formData = new FormData();
    formData.append("title", title);
    formData.append("content", contentData);
    formData.append("tags", tagsData);
    const request = new XMLHttpRequest();
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    request.open("POST", `${backendURL}/api/upload`);
    request.send(formData);
  };

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
          <TagsInput setTagsData={setTagsData} />
          <div className="text_editor">
            <TextEditor setContentData={setContentData} />
          </div>

          {showData && <div>{parse(handleData(contentData))}</div>}
          {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
        </div>
      </div>
    </>
  );
};
export default UploadPost;
