import React, { useContext, useEffect, useState } from 'react'
import { VscActivateBreakpoints } from "react-icons/vsc"
import { FaRegHeart } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { FaHeart } from "react-icons/fa";
import { JobStoreContext } from '../context/JobStore';
import { StoreContext } from '../context/StoreContext';

const AllJobCard = ({job , isActive}) => {

    const {setFavJobs , favJobs , favouriteJobs} = useContext(JobStoreContext);
    const {fetchFreelancer ,freelancerProfile} = useContext(StoreContext);

    useEffect(() => {
      fetchFreelancer();
    },[favJobs])



    const [fav , setFav] = useState(false);

     const isFav = freelancerProfile?.favJobs?.includes(job._id)



  return (
    <div className={`bg-white rounded-lg w-80 h-70 p-5 ${isActive ? "border-2 border-blue-85" : ""}`}>
        {/* Title and fav btn */}
       <div className='flex items-center justify-between'>
                {/* title & appliants */}
                <div>
                        <p className='text-xl font-outfit font-semibold'>{job?.title}</p>
                        <div className='flex items-center gap-2'>
                        <VscActivateBreakpoints className='size-3'/>
                        <p className='text-gray-300 text-sm'>Applicants</p>
                        </div>
                </div>

                {/* Fav btn */}
                <button onClick={() => favouriteJobs(job?._id) } >
                    {isFav
                    ?<FaHeart className='text-pink-600'/>
                    :<FaRegHeart className='text-pink-600'/>}
                </button>
       </div>

        {/* Freelancer Experience */}
       <div className='mt-3 flex gap-3'>
            <div className='bg-violet-200 w-fit p-1 rounded-sm'>
                <p className='text-violet-800 font-outfit text-xs'>{job?.experienceLevel}</p>
            </div>

            <div className='bg-green-300 w-fit p-1 rounded-sm'>
                <p className='text-green-800 font-outfit text-xs'>{job?.mode}</p>
            </div>

            <div className='bg-orange-200 w-fit p-1 rounded-sm'>
                <p className='text-orange-800 font-outfit text-xs'>{job?.salaryType}</p>
            </div>
       </div>

       {/* Small Description */}
       <div className='mt-3'>
        <p className='text-sm font-outfit text-gray-300'>{job?.description} </p>
       </div>

       {/* Budget */}
       <div className='mt-4 border-t-1 border-gray-200 p-2 flex items-center justify-between'>
                {/* Budget */}
                <div className='mt-2'>
                    <p className='font-outfit font-semibold'>${job?.budget}<span className='font-outfit text-gray-50 font-light'>/hr</span></p>
                </div>

                <div className='flex gap-1 relative top-1'>
                    <FiClock className='text-gray-50 size-5' />
                    <p className='text-gray-50 text-sm font-outfit'> Posted {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true })}</p>
                </div>
       </div>

       {/* Details btn  */}
       <button className='bg-blue-85 w-full rounded-lg p-1 mt-2 hover:bg-blue-700'>
            <p className='text-lg font-outfit text-white'>View Details</p>
       </button>
    </div>
  )
}

export default AllJobCard