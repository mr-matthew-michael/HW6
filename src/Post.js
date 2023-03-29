// Job of this component is to display a post
// and to allow users to interact with the post

import React from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './Bookmark';
import Comments from './Comments';
import {getHeaders} from './utils';
import './card.css';
import { useState } from "react";

export default function Post({post, token}) {

    const [actualPost, setActualPost] = useState(post);

    async function requeryPost() {
        // get a fresh copy of the post
            const response = await fetch(`/api/posts/${post.id}`, {
            method: "GET",
            headers: getHeaders(token)
        });
        const data = await response.json();
        // to make the screen redraw after requerying the post,
        // we need to set a state variable:
        console.log(data);
        setActualPost(data);
    }
   
    // JSX representation of a Post
    return (
      <div>
        <section className="card" id={`post_${post.id}`}>
          <div className="header">
            <h3>{post.user.username}</h3>
            <button className="icon-button">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
          <img src={post.image_url} alt="placeholder image" width="300" height="300" />
          <div className="info">
            <div className="buttons">
              <div>
                <LikeButton post={actualPost} token={token} requeryPost={requeryPost} />
                <button className="icon-button">
                  <i className="far fa-comment"></i>
                </button>
                <button className="icon-button">
                  <i className="far fa-paper-plane"></i>
                </button>
              </div>
              <div>
                <BookmarkButton post={actualPost} token={token} requeryPost={requeryPost} />
              </div>
            </div>
            <p className="likes">
              <strong>{actualPost.likes.length} likes </strong>
            </p>
            <div className="caption">
              <p>
                <strong>{post.user.username}</strong> {post.caption}
              </p>
            </div>
          </div>
          <Comments post={actualPost} token={token} requeryPost={requeryPost} />
        </section>
      </div>
    );
}
