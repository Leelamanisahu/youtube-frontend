import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import SuggestedVideos from './SuggestedVideos';
import { useParams } from 'react-router-dom';
import api from '../axios/api';
import { useDispatch } from 'react-redux';
import { fetchSuccess } from '../redux/videoSlice';

const VideoPage = () => {
    const {id} = useParams();
    
    const [video,setVideo] = useState();
    const dispatch = useDispatch();
    const [suggestionVideo,setSuggestionVideo] = useState([]);
    const getVideo = async()=>{
        try {
            const response = await api.get(`/video/get-one/${id}`);
            const data = response.data[0]
            setVideo(data);
            dispatch(fetchSuccess(data));
            const genre = data.genere.toString();
            getSuggestionVideo(genre)
        } catch (error) {
            console.log(error);
        }
    }
    const getSuggestionVideo = async(genre)=>{
      try {
        const response = await api.get(`/video/get-suggestion-video?genre=${genre}`)
        setSuggestionVideo(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
        getVideo()
    },[id])

  return (
    <div className="flex justify-center flex-col lg:flex-row w-full h-full mt-20 lg:px-20">
      {/* Main Video Section */}
      <div className="lg:w-[70%] w-full lg:p-4">
        <VideoPlayer video={video}/>
      </div>

      {/* Suggestions Section */}
      <div className="lg:w-[30%] w-full bg-white p-4 border-l border-gray-200">
        {
          suggestionVideo.length >0?suggestionVideo.map((video)=>(
            <SuggestedVideos key={video._id} video={video}/>
          )):
          <h2>
            Loading.....
          </h2>
        }
      </div>
    </div>
  );
};

export default VideoPage;
