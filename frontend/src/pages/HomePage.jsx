import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/Postcard';
import PostInput from '../components/Postinput';

const HomePage = () => {
  const [posts, setPosts] = useState([
    { id: 1, name: 'John', text: 'Hello, world!', likes: 10, date: new Date('2024-05-01') },
    { id: 2, name: 'Alice', text: 'This is a sample post.', likes: 20, date: new Date('2024-04-30') },
  ]);
  const [sortBy, setSortBy] = useState('date');

  const handleAddPost = (text) => {
    const newPost = {
      id: Date.now(),
      name: 'CurrentUser', // Assuming the user's name
      text,
      likes: 0,
      date: new Date(),
    };
    setPosts([newPost, ...posts]);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'likes') {
      return b.likes - a.likes;
    } else if (sortBy === 'date') {
      return b.date - a.date;
    }
  });

  return (
    <div className="container  mx-auto">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      {/* Post input field */}
      <div className='border-2'>
      <PostInput onAddPost={handleAddPost} />
      </div>
      {/* Sorting options */}
      <div className=" flex items-center gap-1 m-4">
        <label htmlFor="sort" className="block text-gray-700">Sort Post by:</label>
        <select id="sort" name="sort" value={sortBy} onChange={handleSortChange} className="border w-1/12 text-center border-gray-300 rounded px-3 py-2">
          <option value="date">Date</option>
          <option value="likes">Likes</option>
        </select>
      </div>
      {/* Post cards */}
      {sortedPosts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default HomePage;
