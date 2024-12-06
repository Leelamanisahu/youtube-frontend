import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Video from './Video'
import ListItems from './ListItem'
import { useSelector } from 'react-redux'
import api from "../axios/api";


const Home = () => {

  const currentUser = useSelector((state)=> state.user)

  const api_uri = import.meta.env.VITE_API_URI;

  const [videos,setVideos] = useState([]);

  const[categories,setCategories] = useState('');

  const getVideos = async(cat)=>{
      try {
        const response = await api.get(`/video/get?genre=${cat}`);
        const data = response.data;
        setVideos(data);
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(()=>{
    getVideos(categories)
  },[categories])

 
 
  return (
    <div className="flex mt-20">
    <Sidebar />
    <div className="h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden">
      <ListItems setCategories={setCategories} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 " >
      {
        videos &&
         videos.map((item) => {
          return (<Video  key={item._id} video={item} />);
        })
      }
      </div>
    </div>
  </div>
  )
}

export default Home
