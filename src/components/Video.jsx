import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Time from "../Loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

const Video = ({ video }) => {

  const navigate = useNavigate();

  const handleNavigate = (path) =>{
    navigate(path)
  }

  return (
    <div  className="">
      <div>
        <div className="flex flex-col cursor-pointer">
          {/* thumbnail & duration */}
          <div className="relative h-48 md:h-56 rounded-xl hover:rounded-none duration-200 overflow-hidden">
            <img
              onClick={()=>handleNavigate(`/video/${video._id}`)}
              className="h-full w-full object-cover"
              src={video?.thumbnail}  
              alt={video?.title}
            />
            {video?.duration && <Time time={video?.duration} />}
          </div>

          {/* channel logo & title */}
          <div className="flex mt-3 space-x-2" 
          onClick={()=>{handleNavigate(`/channel/${video.channelId}`)}}
          >
            <div className="flex items-start">
              <div className="flex h-9 w-9 rounded-full overflow-hidden border">
                <img
                  className="h-full w-full rounded-full overflow-hidden"
                  src={video.channelImage} 
                  alt={video?.channelName}
                />
              </div>
            </div>
            <div>
              <span className="text-sm font-bold line-clamp-2">
                {video?.title}
              </span>
              <span className="flex items-center font-semibold mt-2 text-[12px] text-gray-600">
                {video?.channelName}
                <BsFillCheckCircleFill className="text-gray-600 ml-1 text-[12px]" />
              </span>
              <div className="flex text-gray-500 text-[12px]">
                <span>{`${abbreviateNumber(video?.views, 2)} views`}</span>
                <span className="flex text-[24px] leading-none font-bold relative top-[-10px] mx-1">
                  .
                </span>
                <span>{`Published: ${video?.description}`}</span> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
