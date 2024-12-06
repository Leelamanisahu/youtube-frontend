import React from 'react';
import { useNavigate } from 'react-router-dom';



const SuggestedVideos = ({video}) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4 mt-3"
      onClick={()=>{navigate(`/video/${video._id}`)}}
    >
        <div  className="flex space-x-4 cursor-pointer">
          <img src={video?.thumbnail} alt="thumbnail" className="w-40 h-24 object-cover" />
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
            <span className="text-xs text-gray-500">{video.channelName}</span>
            <span className="text-xs text-gray-500">{video.views} views</span>
          </div>
        </div>
    </div>
  );
};

export default SuggestedVideos;
