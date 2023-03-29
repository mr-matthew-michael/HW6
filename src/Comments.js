import React from 'react';
import {getHeaders} from './utils';
import './card.css';

export default function Comments({ post, token, requeryPost }) {
  // some logic at the top:
  const postId = post.id;

  async function comment() {
    const endpoint = `/api/comments`;
    const inputElement = document.getElementById(`text-box-${postId}`);
    const text = ' '+inputElement.value;
    console.log("this is ", text);
    const postData = {
      "post_id": postId,
      "text": text
    };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(postData)
    })

    const data = await response.json();
    console.log("test", data);
    requeryPost()
  }

  function handleSubmit(e) {
    e.preventDefault();
    const inputElement = document.getElementById(`text-box-${postId}`);
    const text = ' '+inputElement.value;
    console.log("this is ", text);
    comment(text);
    inputElement.value = ''; // Reset the input field after submitting
  }

  function handleClick(e) {
    e.preventDefault();
    const inputElement = document.getElementById(`text-box-${postId}`);
    const text = ' '+inputElement.value;
    console.log("this is ", text);
    comment(text);
    inputElement.value = ''; // Reset the input field after submitting
  }
  // return some JSX:
  return (
    <>
      <div className="comments">
        {post.comments.length > 1 ? (
          <>
            <button
              className="view-comments"
              //onClick={() => openModal(post.id)}
            >
              View all {post.comments.length} comments
            </button>
            <p>
              <strong>
                {post.comments[post.comments.length - 1].user.username}
              </strong>
              {post.comments[post.comments.length - 1].text}
            </p>
          </>
        ) : post.comments.length === 1 ? (
          <p>
            <strong>{post.comments[0].user.username}</strong>{' '}
            {post.comments[0].text}
          </p>
        ) : (
          ''
        )}
        <p className="timestamp">{post.display_time}</p>
      </div>
      <div className="add-comment">
        <form onSubmit={handleSubmit}>
          <div className="input-holder">
            <label htmlFor={`text-box-${postId}`}>
              <input
                id={`text-box-${postId}`}
                type="text"
                placeholder="Add a comment..."
                autoFocus
              />
            </label>
          </div>
          </form>
          <div className="button-holder">
            <button className="button" type="button" onClick={handleClick}>
              Post
            </button>
          </div>
      </div>
    </>
  );
}



