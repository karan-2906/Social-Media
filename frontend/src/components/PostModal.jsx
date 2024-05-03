import React from 'react';
import PostInput from './Postinput';

const PostModal = ({ onClose, onAddPost }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 w-1/2 rounded">
        <PostInput onAddPost={onAddPost} />
        <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mt-4">Close</button>
      </div>
    </div>
  );
};

export default PostModal;
