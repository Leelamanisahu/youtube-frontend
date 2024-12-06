import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import api from "../axios/api";
import { formatDistanceToNow } from 'date-fns';

const SearchResult = () => {

    const {searchQuery} = useParams();

    const [searchResult,setSearchResult] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async(query)=>{
      try {
        const response = await api.get(`/video/search?searchQuery=${query}`)
        // console.log(response.data);
        setSearchResult(response.data)
      } catch (error) {
          console.log(error)
      }
    }

    const handleNavigate = (path)=>{
        navigate(path);
    }

    useEffect(()=>{
        handleSearch(searchQuery);
    },[searchQuery])

  return (
    <div className="flex mt-20">
      <Sidebar/>
      <div className="h-[calc(100vh-6.625rem)] w-full overflow-y-scroll overflow-x-hidden">
        <div className='flex flex-col justify-center items-center w-[100%]'>
          {
            searchResult.map((video)=>(
              <div key={video._id} className="flex space-x-4 p-4  rounded-md shadow-sm transition duration-200 w-[70%]">
              {/* Thumbnail */}
              <div className="w-96 h-64 relative">
                <img
                  src={video.thumbnail}
                //   alt={video.title}
                onClick={()=>{handleNavigate(`/video/${video._id}`)}}
                  className="w-full h-full object-cover rounded-lg"
                />
                <span className="absolute bottom-2 right-2 text-xs  bg-opacity-70  px-1 rounded">
                  {/* {video.duration} */}
                  45.5
                </span>
              </div>
        
              {/* Video Details */}
              <div className="flex-1 ">
                {/* Video Title */}
                <h3 className="text-lg font-semibold">
                  {video?.title}
                </h3>
        
                {/* Metadata */}
                <div className="text-sm text-gray-400 space-x-2">
                  <span>
                    {video.views}
                     views</span>
                  <span>•</span>
                  <span>
                    {/* {video.uploadedTime} */}
                    {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
                     </span>
                </div>
        
                {/* Channel Info */}
                <div 
                  onClick={()=>handleNavigate(`/channel/${video.channelId}`)}
                className="flex items-center space-x-2 mt-2">
                  <div className="w-6 h-6 bg-gray-500 rounded-full">
                    <img src={video.channelImage}
                    className="w-full h-full object-cover rounded-lg"
                    alt="channel image" srcset="" />
                  </div>
                  <span className="text-sm">
                    {video.channelName}
                    </span>
                </div>
        
                {/* Video Description */}
                <p className="text-sm text-gray-400 mt-1">
                  {video.description}
            {/* video description */}
                </p>
              </div>
        
              {/* Options Button */}
              <div className="flex items-start">
                <button className="text-gray-400 hover:text-white">
                  <BsThreeDotsVertical />
                </button>
              </div>
            </div>
            ))
          }
     
    </div>
    </div>
    </div>
  )
}

export default SearchResult
