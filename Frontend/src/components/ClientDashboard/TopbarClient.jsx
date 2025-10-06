import { FaSearch } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { JobStoreContext } from "../../context/JobStore";
import { useContext } from "react";

const TopbarClient = () => {

    const {setPostJob , client} = useContext(JobStoreContext);

  return (
    <div className='w-full h-fit mt-5 px-5'>
        {/* Main Container */}
        <div className='flex justify-between'>
            {/* Greeting */}
            <div>
                <p className='text-4xl font-outfit font-semibold'>{`Hello ${client?.fullName?.split(" ")[0] || ""} !!`}</p>
            </div>
            
            {/* Search , noification , Button */}
            <div className='flex gap-3 items-center'>
                <div className='bg-gray-200 rounded-full w-fit h-fit p-2'>
                    <FaSearch />
                </div>

                <div className='bg-gray-200 rounded-full w-fit h-fit p-2'>
                    <FaRegBell />
                </div>

             
                <button onClick={() => setPostJob(true)} className='bg-blue-85 p-1 rounded-lg flex items-center gap-1 hover:bg-blue-700'>
                    <p className='font-outfit text-2xl text-white'>Post Job</p>
                    <div className='text-white'><FaPlus /></div>
                </button>
        
            </div>
        </div>
    </div>
  )
}

export default TopbarClient