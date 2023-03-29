import React from 'react';
import {getHeaders} from './utils';


export default function LikeButton({post, token, requeryPost}) {
    // some logic at the top:
    const likeId = post.current_user_like_id;
    const postId = post.id;

    async function likeUnlike() {
        if (likeId) {
            const response = await fetch(`/api/posts/likes/${likeId}`, {
                method: "DELETE",
                headers: getHeaders(token)
            });
            const data = await response.json();
            console.log(data);
            requeryPost();
        } else {
            // code to like a post:
            console.log('like!')
            const postData = {
                "post_id": postId
            };
            const response = await fetch("/api/posts/likes/", {
                method: "POST",
                headers: getHeaders(token),
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log(data);
            requeryPost();
        }
    }

    // return some JSX:
    return (
      post.current_user_like_id ? (
        <button
          className="icon-button"
          onClick={() => likeUnlike()}
          aria-label="Unlike"
          aria-checked="true"
          role="switch"
        >
          <i className="fa-solid fa-heart"></i>
        </button>
      ) : (
        <button
          className="icon-button"
          onClick={() => likeUnlike()}
          aria-label="Like"
          aria-checked="false"
          role="switch"
        >
          <i className="fa-regular fa-heart"></i>
        </button>
      )
    );    
}