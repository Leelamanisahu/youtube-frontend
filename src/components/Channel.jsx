import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../axios/api';
import { IoAddCircleOutline } from "react-icons/io5";
import VideoUploadModal from './VideoUploadModal';
import { formatDistanceToNow } from 'date-fns';
import { abbreviateNumber } from 'js-abbreviation-number';
import ChannelVideo from './ChannelVideo';
import { useSelector } from 'react-redux';

const Channel = () => {
    const {channelId} = useParams();
    const [channelDetials,setChannelsDetails] = useState({});
    const [videos,setVideos] = useState([]);

    const userId = useSelector((state)=>state.user._id)
    const userChannel = useSelector((state)=>state.user.channels)
        
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit , setIsEdit] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
      setIsModalOpen(false)
      setIsEdit(null);
    };


   const getChannelData = async(id)=>{
    try {
      const response = await api.get(`channel/get/${id}`);
      // console.log(response.data)
      setChannelsDetails(response.data)
      setVideos(response?.data?.videos)
    } catch (error) {
      console.log(response.error)
    }
   }

   const handleEdit = (video) => {
    console.log('Edit video:', video);
    setIsEdit(video);
    openModal()
    // Open edit modal or navigate to edit page
};

const handleDelete = async(videoId) => {
    // Show confirmation and delete the 
    try {
      const response = await api.delete(`/video/delete-video/${videoId}`)
      // console.log(response.data);
      const newVideos = videos.filter((video)=>video._id != videoId);
      setVideos(newVideos);
    } catch (error) {
      console.log(error)
    }
};

   useEffect(()=>{
    getChannelData(channelId)
  },[channelId])
  
 
  return (
     <div className="bg-gray-100 mt-12 min-h-screen relative">
      {/* Channel Header Section */}
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative">
            {/* Channel Banner */}
            <img
              src={channelDetials.channelBanner} 
              alt="Channel Banner"
              className="w-full h-52 object-cover"
            />
            {/* Channel Info */}
            <div className="flex mt-10 items-center space-x-4">
              {/* Profile Image */}
              <img
              src={channelDetials.channelBanner}
              alt="Profile Logo"
                className="rounded-full w-20 h-20 border-4 border-white"
              />
              <div>
                <h1 className="text-2xl font-bold">{channelDetials.channelName}</h1>
                <p className="text-gray-600">@{channelDetials?.owner?.username} • {channelDetials.subscribers} subscribers • {channelDetials?.videos?.length} videos</p>
              </div>
              {/* Subscribe Button */}
              <div className="ml-auto">
                <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Channel Navigation Tabs */}
          <div className="flex space-x-6 mt-12 px-8">
            {/* <button className="font-semibold text-gray-700">Home</button> */}
            <button className="font-semibold text-gray-700 border-b-2 border-black">Videos</button>
            {/* <button className="font-semibold text-gray-700">Playlists</button> */}
            {/* <button className="font-semibold text-gray-700">Community</button> */}
            {/* <button className="font-semibold text-gray-700">About</button> */}
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="max-w-screen-xl mx-auto py-8">
        <h2 className="text-xl font-semibold mb-4">Latest Videos</h2>
        {/* Video Thumbnails Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Video Card */}
          {
            videos.map((video,index)=>(
              <ChannelVideo  key={video._id}
              video={video}
              onEdit={handleEdit}
              onDelete={handleDelete}
              editeable={userId === channelDetials?.owner?._id}
               />
            ))
          }
        {
            channelId === userChannel
            &&
        <div
         onClick={openModal}
        className='p-4 bg-slate-400 text-white w-20 h-14 self-center rounded-lg cursor-pointer hover:bg-slate-300 transition-all flex justify-center items-center'>
        <IoAddCircleOutline size={30} color='black'/>
         </div>
          }
        </div>
      </div>
      <VideoUploadModal isOpen={isModalOpen} onClose={closeModal} isEdit={isEdit} channelId={channelId} getChannelData={getChannelData}  />
    </div>
  )
}

export default Channel
