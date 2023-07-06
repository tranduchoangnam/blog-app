import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

export default function TextEditor({ setContentData }) {
  const editor = useRef(null);
  const [content, setContent] = useState("Start writing");
  const config = {
    readonly: false,
    width: 700,
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => {
          setContent(newContent);
          setContentData(newContent);
        }}
        onChange={(newContent) => {}}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
    </div>
  );
}
