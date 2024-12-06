import React, { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import api from '../axios/api';
import { useDispatch } from 'react-redux';
import { createChannel, loginSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const ProfileSetupPopup = ({ isVisible,setIsVisible, onClose }) => {
  if (!isVisible) return null;


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);


  const [selectedImage, setSelectedImage] = useState(null);
  const [inputs,setInputs] = useState({
    channelName:"",
    description:"",
    file:null,
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setInputs(prev=>({...prev,file:file}));
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setInputs(prev=>({
        ...prev,
        [name]: value
    }))
  }


  const handleSubmit = async()=>{
        try {
          setLoading(true);
            const response = await api.post("/channel/create",inputs,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });
            const data = response.data;
            // console.log(data)
          dispatch(createChannel({
            channels:data._id
        }))
            onClose();
            setIsVisible(false);
            setLoading(false);
            navigate(`/channel/${data._id}`)
          } catch (error) {
            setLoading(false);
            console.log(error);
        }
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">How you'll appear</h2>

        <div className="flex flex-col items-center justify-center space-y-4">
          
        <div className="flex flex-col items-center space-y-2">
      <div className="relative cursor-pointer">
        {/* If image is selected, show it, otherwise show the placeholder icon */}
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="rounded-full w-32 h-32 object-cover"
          />
        ) : (
          <MdAccountCircle className="text-blue-500 w-32 h-32" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <label className="text-blue-500 cursor-pointer">Select picture</label>
    </div>

          <input
            type="text"
            placeholder="Name"
            name='channelName'
            onChange={handleChange}
            className="border border-gray-300 rounded w-full py-2 px-4"
            value={inputs.channelName}
          />
          <textarea
            type="text"
            onChange={handleChange}
            placeholder="description"
            className="border border-gray-300 rounded w-full py-2 px-4"
            name='description'
            value={inputs.description}
          />

          <div className="flex justify-end w-full mt-6 space-x-4">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleSubmit}
              disabled={loading}
            >
              {
                loading ? 
                "loading..."
                :
                "Create channel"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPopup;
