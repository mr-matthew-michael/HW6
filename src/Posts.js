import React from 'react';
import Post from './Post';

import { useState, useEffect } from "react";
import {getHeaders} from './utils';

export default function Posts({token}) {
    const [posts, setPosts] = useState([]); 

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('/api/posts', {
                headers: getHeaders(token)
            });
            const data = await response.json();
            setPosts(data);
        }
        fetchPosts();
    }, [token]);

    if (posts.length === 0) {
        return <div id="posts"></div>
    }
   
    return (
        <div id="posts">
            {
                posts.map(post => {
                    return (
                        <Post key={post.id} 
                            post={post} 
                            token={token} />
                    )
                })
            }
        </div>
    );  

}