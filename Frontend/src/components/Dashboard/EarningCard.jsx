import React from 'react'
import { FaDollarSign } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const EarningCard = () => {

const {freelancerProfile , profileUser} = useContext(StoreContext)
    

  return (
    <div 
    style={{ backgroundColor: "#1A76FF", backgroundImage: `url(${assets.eggShellBg})`,
        boxShadow:" rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
}}
    className='h-fit w-[250px]  p-3 rounded-2xl flex flex-col gap-5'>
            <div className='w-fit text-2xl text-blue-85 bg-white p-1 rounded-lg'>
                <FaDollarSign />
            </div>

            <div>
                <div>
                        <p className='font-outfit text-sm text-white'>Total Earning</p>
                </div>

                <div className='flex gap-3 items-center'>   
                    <p className='font-outfit text-3xl text-white'>$ <span>{freelancerProfile?.earning}</span></p>

                    <p className='font-outfit bg-green-500 w-fit h-fit px-1 text-md font-semibold rounded-2xl'>+8.5%</p>
                </div>
                <Link to="/transaction">
                <div className='text-white underline underline-offset-2 text-xs flex items-end gap-3'>
                    <p>check the transactions</p>
                    <FaArrowRight />
                </div>
                </Link>
            </div>
    </div>
  )
}

export default EarningCard