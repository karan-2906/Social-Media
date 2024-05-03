import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostModal from '../components/PostModal';

const ProfilePage = () => {
  // Dummy data for user and posts
  const user = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    avatar: 'https://via.placeholder.com/150', // URL to user's avatar image
  };

  const posts = [
    { id: 1, text: 'First post', date: '2024-05-01' },
    { id: 2, text: 'Second post', date: '2024-04-30' },
  ];

  const [showModal, setShowModal] = useState(false);

  const handleAddPost = (text) => {
    // Add post logic
    console.log('Adding post:', text);
    setShowModal(false); // Close the modal after adding post
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>

      {/* User Info */}
      <div className="flex items-center mb-4">
        <img src={user.avatar} alt="User Avatar" className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <p className="text-gray-700 font-semibold flex gap-1">Bio: <h6 className='font-normal'>{user.bio}</h6></p>

      {/* Button to create new post */}
      <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">Create New Post</button>

      {/* User's Posts */}
      <h2 className="text-2xl font-bold mb-2 mt-4">Posts</h2>
      {posts.map(post => (
        <div key={post.id} className="bg-gray-100 p-4 mb-2 rounded">
          <p>{post.text}</p>
          <p className="text-gray-600 text-sm">{post.date}</p>
        </div>
      ))}

      {/* Post Modal */}
      {showModal && <PostModal onClose={closeModal} onAddPost={handleAddPost} />}
    </div>
  );
};

export default ProfilePage;
