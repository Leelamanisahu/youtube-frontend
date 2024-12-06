import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';

const CommentsList = ({ comments, handleEditComment, handleDeleteComment }) => {
  // State to track the visible menu
  const [openMenu, setOpenMenu] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');

  const userId = useSelector(state=>state.user._id);


  const toggleMenu = (commentId) => {
    setOpenMenu(openMenu === commentId ? null : commentId);
  };

  const startEditing = (comment) => {
    // console.log(comment._id)
    setEditingCommentId(comment._id);
    setEditText(comment.text);
    setOpenMenu(null); // Close the menu
  };

  const saveEdit = (commentId) => {
    // console.log(commentId)
    handleEditComment(commentId, editText);
    setEditingCommentId(null);
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment._id} className="relative mt-8 flex space-x-4">
          {/* Avatar */}

          <div>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
              {comment.username.charAt(0).toUpperCase()}
            </div>
          </div>
          {/* Comment Content */}
          <div className="flex-1">
            {/* User Info */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm">@{comment.username}</span>
              <span className="text-gray-500 text-xs">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </span>
            </div>

            {/* Comment Text or Editable Input */}
            {editingCommentId === comment._id ? (
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="text-sm p-1 border w-[80%] border-gray-300 rounded"
                />
                <button
                  onClick={() => saveEdit(comment._id)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingCommentId(null)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p className="text-sm mt-1">{comment.text}</p>
            )}
          </div>

          {/* Three Dots (Options Menu) */}
          {
            comment?.userId === userId
          &&
          <div className="absolute top-4 right-4">
            <button
              onClick={() => toggleMenu(comment._id)}
              className="text-gray-400 hover:text-black"
            >
              <BsThreeDotsVertical />
            </button>

            {/* Options Menu */}
            {openMenu === comment._id && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => startEditing(comment)}
                >
                  Edit
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
           }
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
