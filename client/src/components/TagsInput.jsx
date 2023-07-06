import React, { useState } from "react";
function TagsInput({ setTagsData }) {
  const [tags, setTags] = useState([]);

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value.trim();
    if (!value || value.length > 50) return;
    setTagsData([...tags, value]);
    setTags([...tags, value]);
    e.target.value = "";
  }
  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <div className="tags title">
      {tags.length > 0 && (
        <div className="tags-list">
          {tags.map((tag, index) => (
            <div className="tag-item" key={index}>
              <span className="text">{tag}</span>
              <span className="close" onClick={() => removeTag(index)}>
                &times;
              </span>
            </div>
          ))}
        </div>
      )}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        className="tags-input"
        placeholder="Add some tags..."
      />
    </div>
  );
}
export default TagsInput;
