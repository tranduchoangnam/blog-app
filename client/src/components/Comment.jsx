import React, { useEffect } from "react";
import { Comment, Icon } from "semantic-ui-react";
import { useGlobalContext } from "../context";
import { useState, useRef } from "react";
import axios from "axios";
import backendURL from "../utils/backendUrl";
const CommentBox = ({ data }) => {
  const { user } = useGlobalContext();
  const [list, setList] = useState(data.comments);
  const ref = useRef(null);
  // const [content, setContent] = useState("");
  const handleComment = (e) => {
    e.preventDefault();
    console.log(data);
    console.log(ref.current.value);
    axios
      .post(
        `${backendURL}/api/create_comment/${data.blog.id}`,
        { content: ref.current.value },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setList([res.data, ...list]);
      });
  };
  //
  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <>
      <h2>Comments</h2>
      {user && (
        <Comment.Group className="wrapper_comment card">
          <Comment>
            <Comment.Avatar
              style={{ marginRight: "10px" }}
              as="a"
              src={user.photo}
            />
            <Comment.Content className="title comment">
              <Comment.Author>
                <div
                  className="comment"
                  style={{ justifyContent: "space-between" }}
                >
                  {user.name}
                  <button onClick={handleComment}>Submit</button>
                </div>
              </Comment.Author>
              {/* <Comment.Metadata>
                <div>{data.comment.date}</div>
                <div>
                  <Icon name="star" />
                  {data.followers} Followers
                </div>
              </Comment.Metadata> */}
              <Comment.Text>
                <textarea ref={ref} />
              </Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      )}
      {list.map((comment) => {
        return (
          <>
            <Comment.Group
              key={comment.comment.id}
              className="wrapper_comment card"
            >
              <Comment>
                <Comment.Avatar
                  style={{ marginRight: "10px" }}
                  as="a"
                  src={comment.user.photo}
                />
                <Comment.Content>
                  <Comment.Author
                    className="comment"
                    style={{
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    {comment.user.name}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.comment.date}</div>
                    <div>
                      <i className="bx bx-heart"></i>
                      {comment.followers} Followers
                    </div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.comment.content}</Comment.Text>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </>
        );
      })}
    </>
  );
};

export default CommentBox;
