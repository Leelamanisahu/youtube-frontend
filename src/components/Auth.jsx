import React, { useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'; // Assuming you're using axios for API calls
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { createChannel, loginStart, loginSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const api_uri = import.meta.env.VITE_API_URI; // API URI

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [error, setError] = useState('');

  // Toggle between Sign In and Sign Up forms
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(''); // Clear error on form switch
  };

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if passwords match for Sign Up
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
        dispatch(loginStart())
      const endpoint = isSignUp ? `${api_uri}/user/register` : `${api_uri}/user/login`;
      const payload = isSignUp
        ? { username: formData.username, email: formData.email, password: formData.password}
        : { email: formData.email, password: formData.password };
      const response = await axios.post(endpoint, payload);
            const data = response.data;
      if (response.data) {
    
        dispatch(loginSuccess({
            _id:data.user._id,
            username:data.user.username,
            email : data.user.email,
            token : data.token,
        })
      )
      dispatch(createChannel({
        channels:data.user.channels
      }))
       
        Cookies.set('access_token', data.token, { expires: 1, sameSite: 'None', secure: true });
        window.location = "/"
        // navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response.data.message);
      console.error('Error:', err);
    }
  };

  return (
    <div className="flex mt-20">
      <Sidebar />
      <div className="h-[calc(100vh-6.625rem)] w-screen overflow-y-scroll overflow-x-hidden">
        <div className='w-full mx-auto flex justify-center items-center min-h-full'>
          <div className='bg-[#d0d3d4] w-[50%] lg:w-[25%] p-8 rounded-lg'>
            <div className='flex flex-col items-center'>
              <h2 className='text-black text-2xl font-semibold mb-6'>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </h2>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
                {isSignUp && (
                  <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={formData.username}
                    onChange={handleInputChange}
                    className='p-2 rounded bg-slate-500 text-white'
                    required
                  />
                )}
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='p-2 rounded bg-slate-500 text-white'
                  required
                />
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='p-2 rounded bg-slate-500 text-white'
                  required
                />
                {isSignUp && (
                  <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className='p-2 rounded bg-slate-500 text-white'
                    required
                  />
                )}
                <button
                  type='submit'
                  className='bg-blue-600 text-white py-2 rounded hover:bg-blue-500'
                >
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </form>

              <p className='text-gray-400 mt-4'>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={toggleForm}
                  className='text-blue-400 hover:underline'
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;
