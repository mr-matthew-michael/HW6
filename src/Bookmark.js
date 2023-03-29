import React from 'react';
import {getHeaders} from './utils';


export default function BookmarkButton({post, token, requeryPost}) {
    // some logic at the top:
    const theBId = post.current_user_bookmark_id;
    const postId = post.id;

    async function BookUnbook() {
        if (theBId) {
            const response = await fetch(`/api/bookmarks/${theBId}`, {
                method: "DELETE",
                headers: getHeaders(token)
            });
            const data = await response.json();
            console.log(data);
            requeryPost();
        } else {
            // code to like a post:
            console.log('Bookmarked!')
            const postData = {
                "post_id": postId
            };
            const response = await fetch("/api/bookmarks/", {
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
      theBId ? (
        <button
          className="icon-button"
          onClick={() => BookUnbook()}
          aria-label="Unbookmark"
          aria-checked="true"
          role="switch"
        >
          <i className="fa-solid fa-bookmark"></i>
        </button>
      ) : (
        <button
          className="icon-button"
          onClick={() => BookUnbook()}
          aria-label="Bookmark"
          aria-checked="false"
          role="switch"
        >
          <i className="fa-regular fa-bookmark"></i>
        </button>
      )
    );    
}