import React, { useState } from "react";
import Avatar from "react-avatar";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/togglerSlice";
import { logout } from "../redux/userSlice";
import Cookies from "js-cookie";
import ProfileSetupPopup from "./ProfileSetupPopup"; // Import the popup
import Channel from "./Channel";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false); // State for dropdown menu
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility

  const channels = useSelector(state=>state.user.channels);

  


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  const toggleSideBarHandler = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("access_token");
    navigate("/auth");
    toggleMenu();
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev); // Toggle the dropdown menu
  };

  const togglePopup = () => {
    if(channels){
      navigate(`/channel/${channels}`)
    }else{
      setIsPopupVisible((prev) => !prev); // Toggle the popup
    }
    toggleMenu();
  };

  return (
    <div className="flex justify-between fixed top-0 w-[100%] z-50 bg-white px-6 py-2 ">
      <div className="flex items-center space-x-4  ">
        <AiOutlineMenu className="text-xl cursor-pointer" onClick={toggleSideBarHandler} />
        <img
          onClick={()=>navigate("/")}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube Logo"
          className="h-6"
        />
      </div>

      <div className="flex w-[35%] items-center ">
        <div className="w-[100%] px-4 py-2 border-[1px] border-gray-400 rounded-l-full">
          <input
            type="text"
            placeholder="Search"
            className=" outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
          />
        </div>
        <button
          className="px-4 py-2 border-[1px] border-gray-400 bg-gray-100 rounded-r-full"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <CiSearch size={"24px"} />
        </button>
        <IoMdMic
          size={"42px"}
          className="ml-3 border border-gray-600 rounded-full p-2  hover:bg-gray-200 duration-200"
           // Show popup when the mic icon is clicked
        />
      </div>

      <div className="flex space-x-5 items-center relative">
        {/* <RiVideoAddLine className="text-2xl cursor-pointer" /> */}
        <AiOutlineBell className="text-2xl" />
        <div onClick={toggleMenu} className="cursor-pointer">
          <Avatar
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2uLl8zBoK0_iM5pNwJAC8hQ2f68YKtlgc7Q&s"
            }
            size="32"
            round={true}
          />
        </div>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute top-12 right-0 w-[200px] bg-white z-[9999] border shadow-lg rounded-lg">
            <div className="flex flex-col py-2">
              <Link to="#" className="px-4 py-2 hover:bg-gray-200"
               onClick={togglePopup}>
                Your Channel
              </Link>
              <hr className="my-2" />
              <div onClick={handleLogout} className="px-4 py-2 hover:bg-gray-200">
                Sign out
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Setup Popup */}
     <ProfileSetupPopup isVisible={isPopupVisible}  setIsVisible={setIsPopupVisible} onClose={togglePopup} />
      
 
    </div>
  );
}

export default Navbar;
