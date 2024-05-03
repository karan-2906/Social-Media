import React, { useState } from 'react';

const PostInput = ({ onAddPost }) => {
  const [text, setText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddPost(text);
    setText('');
  };

  const handleClear = () => {
    if (text.trim() === '') return; // If input is already empty, do nothing
    setShowModal(true);
  };

  const confirmClear = () => {
    setShowModal(false);
    setText('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-4 bg-slate-200">
      <form onSubmit={handleSubmit}>
        <label htmlFor="post" className="block text-gray-700">Write your post:</label>
        <textarea 
          id="post" 
          name="post" 
          value={text} 
          onChange={handleChange} 
          className="border border-gray-300 rounded px-3 py-2 w-full"
          rows="2"
        ></textarea>
        <div className="flex items-center mt-2 gap-2">
          <button type="button" onClick={handleClear} className="bg-red-500 text-white px-4 py-2 w-1/12 rounded hover:bg-red-600">Clear</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-1/6 rounded mr-2 hover:bg-blue-600">Post</button>
        </div>
      </form>
      {/* Confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <p>Are you sure you want to clear the input?</p>
            <div className="flex justify-end mt-4">
              <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2">Cancel</button>
              <button onClick={confirmClear} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Clear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInput;
