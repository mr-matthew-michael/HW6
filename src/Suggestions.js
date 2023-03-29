import React, { useState, useEffect } from 'react';
import './Suggestions.css';
import {getHeaders} from './utils';

export default function Suggestions({ token }) {
  const [suggestions, setSuggestions] = useState([]);
  const [followed, setFollowed] = useState(null);
  const [followed2, setFollowed2] = useState({});

  useEffect(() => {
    async function fetchSuggestions() {
      const response = await fetch('/api/suggestions', {
          method: "GET",
          headers: getHeaders(token)
      });
      
      const data = await response.json();
      console.log('suggestion:', data);
      setSuggestions(data);
    }
    fetchSuggestions();
  }, [token]);

  const followPost = async (postId) => {
    const endpoint = `/api/following`;
    const postData = {
      "user_id": postId // replace with the actual post ID
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(postData)
    })
    console.log(postId);
    const data = await response.json();
    console.log("posted!", data);
    setFollowed(data.id);
    setFollowed2({...followed2, [postId]: true});
  }

  const unFollowPost = async (postId) => {
    console.log("unfollow", followed);
    const endpoint = `/api/following/${followed}`;

    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: getHeaders(token)
    })

    const data = await response.json();
    console.log(data);
    setFollowed(null);
    setFollowed2({...followed2, [postId]: false});
  }

  const renderSuggestions = (data) => {
    const isFollowed = followed2[data.id];
    //const isFollowed = followed != null;
    //console.log("followed", data);
  
    return (
      <section className="suggestions" key={data.id} id={`following_${data.id}`}>
        <img src={data.thumb_url} className="pic" alt="User thumbnail" />
        <div>
          <p className="username">{data.username}</p>
          <p>suggested for you</p>
        </div>
        {!isFollowed ? (
          <button
            className="button"
            id={`follow-button-${data.id}`}
            onClick={() => followPost(data.id)}
            aria-label="follow"
            aria-checked="false"
            role="switch"
          >
            follow
          </button>
        ) : (
          <button
            className="button"
            id={`unfollow-button-${data.id}`}
            onClick={() => unFollowPost(data.id)}
            aria-label="unfollow"
            aria-checked="true"
            role="switch"
          >
            unfollow
          </button>
        )}
      </section>
    );    
  };

  if (suggestions.length === 0) {
    return <div className="suggestions-section"></div>;
  }

  return (
    <div className="suggestions">
      {suggestions.map((suggestion) => renderSuggestions(suggestion))}
    </div>
  );
}
