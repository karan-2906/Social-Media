import React from 'react';

const PostCard = ({ name, text, likes }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <p className="text-gray-700 mb-4">{text}</p>
      <div className="flex items-center justify-between">
        <button className="text-blue-500 hover:text-blue-700">
          Like ({likes})
        </button>
        <button className="text-blue-500 hover:text-blue-700">
          Save
        </button>
      </div>
    </div>
  );
};

export default PostCard;
