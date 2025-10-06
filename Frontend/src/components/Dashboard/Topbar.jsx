import React from 'react'
import { assets } from '../../assets/assets';
import { FaSearch } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const Topbar = () => {

  const {freelancerProfile , profileUser} = useContext(StoreContext)



  return (
            <div className='flex justify-between'>
                 {/* Name of the Freelancer */}
                <div className="text-4xl font-outfit font-semibold relative left-11">
                  <p>Hello <span>{freelancerProfile?.name.split(" ")[0] || "freelancer"}</span>!</p>
                </div>

                {/* profile */}
                <div className="flex items-center gap-4">
                  {/* Search and bell */}
                    <div className="flex gap-2">
                        <div className="bg-gray-200 p-2 rounded-full h-fit"><FaSearch /></div>
                        <div className="bg-gray-200 p-2 rounded-full h-fit"><FaRegBell /></div>
                    </div>

                    {/* profile image */}
                    <div className="flex w-fit p-1 rounded-full justify-between gap-1 items-center font-outfit font-semibold  border-2 border-blue-85">
                      {/* img */}
                      <div>
                        <img src={ profileUser?.profilePic || assets.userDefaultImage}  className="size-10 rounded-full"/>
                      </div>
                      {/* name */}
                      <div>
                        <p>{freelancerProfile?.name || "username"}</p>
                      </div>
                    </div>
                </div>
            </div>
  )
}

export default Topbar