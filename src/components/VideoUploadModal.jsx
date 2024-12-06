import React, { useEffect, useState } from 'react';
import api from '../axios/api';

const VideoUploadModal = ({ isOpen, isEdit, onClose, channelId, getChannelData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading,setLoading] = useState(false);

    // Populate form fields when editing
    useEffect(() => {
        if (isEdit) {
            setTitle(isEdit.title);
            setDescription(isEdit.description);
            setGenre(isEdit.genere?.join(", ") || ''); // assuming genere is an array
        }else{
            resetForm();
        }
    }, [isEdit]);


    const resetForm = () => {
        setTitle('');
        setDescription('');
        setGenre('');
        setThumbnail(null);
        setVideo(null);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('genere', genre);
            if (thumbnail) formData.append('thumbnail', thumbnail);
            if (video) formData.append('video', video);
            formData.append('channelId', channelId);
            if (isEdit != null) {
                // Update existing video
                await api.put(`/video/update/${isEdit._id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                // Add new video
                await api.post(`/video/add`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            onClose();
            getChannelData(channelId);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error uploading video:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-lg mx-auto rounded-lg p-8 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">
                    {isEdit ? 'Edit Video' : 'Upload Video'}
                </h2>

                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        className="w-full mt-1 border border-gray-300 p-2 rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Description Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="w-full mt-1 border border-gray-300 p-2 rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Genre Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Genre</label>
                    <input
                        type="text"
                        className="w-full mt-1 border border-gray-300 p-2 rounded-md"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>

                {/* Thumbnail Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                    <input
                        type="file"
                        className="w-full mt-1"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                    />
                </div>

                {/* Video Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Video</label>
                    <input
                        type="file"
                        className="w-full mt-1"
                        onChange={(e) => setVideo(e.target.files[0])}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {
                            loading?"loding...":
                        isEdit ? 'Update' : 'Upload'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoUploadModal;
