import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Comment = ({videoId,isComment,comment,commentHandler,cancelComment,submitComment}) => {
  
  const username = useSelector(state=>state.user.username)

  return (
    <div className='w-full flex flex-col items-start'>
        <div className='w-full flex justify-center items-center gap-5'>
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className='w-full flex flex-col'>
            <input 
            value={comment}
            onChange={(e)=>commentHandler(e.target.value)}
            type="text"  className='w-[100%]  outline-none' 
            style={{borderBottom:"1px solid black"}}
            placeholder='Add Comment'
            />
            {
              isComment ?<div className='flex gap-2 text-sm self-end px-3 mt-3'>
                <div className=' hover:bg-[#d0d3d4] transition-all py-2 px-3 rounded-xl cursor-pointer font-medium'
                onClick={cancelComment}>Cencel</div>
                <div className={`${comment.length > 0 ? 'bg-blue-600 text-black':'bg-[#dfe1e2]' }  cursor-pointer  font-medium py-2 px-3 rounded-xl`}
                  onClick={()=>{submitComment(videoId)}}
                  >comment</div>
            </div>:
            <div>
              </div>
            }
            </div>
        </div>
    </div>
  )
}

export default Comment
