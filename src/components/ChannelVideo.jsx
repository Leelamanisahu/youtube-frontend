import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ChannelVideo = ({ video, onEdit, onDelete,editeable }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate =  useNavigate();
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleNavigate = (id)=>{
        console.log(id);
        navigate(`/video/${id}`)
    }

    return (
        <div key={video._id} className="bg-white rounded-lg shadow-lg relative"
        >
            {/* Video Thumbnail */}
            <img
                src={video.thumbnail}
                alt="Video Thumbnail"
                className="w-full h-32 object-cover rounded-t-lg"
               
            />

            {/* Video Details */}
            <div className="p-4 cursor-pointer" 
             onClick={()=>handleNavigate(video._id)}
             >
                <h3 className="font-bold text-sm">{video.title}</h3>
                <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
                </p>
                <div className="flex text-gray-500 text-[12px]"> 
                    <span className="flex text-[24px] leading-none font-bold relative top-[-10px] mx-1">.</span>
                    <span>{`Published: ${video?.description}`}</span>
                </div>
            </div>
            {/* Three-Dot Menu Icon */}
            {
             editeable &&
            <div className="absolute top-2 right-2 cursor-pointer" onClick={toggleMenu}>
                <FiMoreHorizontal size={20} color='black' />
            </div>
            }

            {/* Edit/Delete Menu */}
            {isMenuOpen && (
                <div className="absolute top-8 right-2 bg-white border border-gray-300 rounded shadow-lg w-28 z-10">
                    <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                            onEdit(video);
                            setIsMenuOpen(false);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                            onDelete(video._id);
                            setIsMenuOpen(false);
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChannelVideo;
