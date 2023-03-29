import React, { useState, useEffect } from 'react';
import './Stories.css';
import { getHeaders } from './utils';

export default function Stories({ token }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function fetchStories() {
      const response = await fetch('/api/stories', {
        headers: getHeaders(token),
      });
      const data = await response.json();
      console.log('Stories:', data);
      setStories(data.slice(0, 4));
    }
    fetchStories();
  }, [token]);

  const renderStory = (story) => {
    return (
      <div key={story.id} className="story">
        <img src={story.user.thumb_url} className="pic" alt="User thumbnail" />
        <p>{story.user.username}</p>
      </div>
    );
  };

  if (stories.length === 0) {
    return <div className="stories"></div>;
  }

  return <div className="stories">{stories.map((story) => renderStory(story))}</div>;
}
