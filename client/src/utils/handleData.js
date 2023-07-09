import DOMPurify from "dompurify";
import parse from "html-react-parser";

export const handleData = (dirtyHTML) => {
  const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
    USE_PROFILES: { html: true },
  });
  return parse(cleanHTML);
};
export const handleTitle = (title) => {
  if (title.length > 55) {
    return title.slice(0, 55) + "...";
  }
  return title;
};
