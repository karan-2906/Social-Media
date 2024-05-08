import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useGetPosts } from '../hooks/posts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faL } from '@fortawesome/free-solid-svg-icons';
import PostCard from '../components/PostCard';
import { useAddPost } from '../hooks/posts';

import BackToTopButton from '../components/BackToTopButton';
const url = process.env.REACT_APP_BASE_URL;

const host = `${url}/api/v1/posts`

const Home = () => {
  const [posts, setPosts] = useState([]);

  const { addPost } = useAddPost();
  const authToken = localStorage.getItem('auth');

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${host}/getposts`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        }
      });
      const responseData = await response.json();
      if (response.ok) {
        setPosts(responseData.posts);
        console.log(responseData.posts)
      } else {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let content = e.target[0].value;

    try {
      await addPost(content);
      await fetchPosts(); 
      content = ''
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchPosts();
  }, [])

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
  };

  return (
    <>
<div className="flex flex-col lg:flex-row bg-white" >
    <Sidebar />

    <div className="container lg:w-3/4 mx-auto px-10 py-8 lg:ml-80">
      <div className="mb-4">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border border-black rounded px-4 py-3 focus:outline-none bg-gray-300 focus:border-black"
            placeholder="Write your post here..."
            name="content"
          ></textarea>
          <button
            type="submit"
            className="mt-4 bg-white border border-black hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none"
          >
            Post
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard post={post} handleLike={handleLike} handleComment={handleComment} />
        ))}
      </div>
        
        <BackToTopButton />
   
    </div>
  </div>
 

    </>
  );
};

export default Home;
