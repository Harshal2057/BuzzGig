import  {useRef} from 'react'
import { assets , pricingPlans } from '../assets/assets'
import { CircleChevronRight } from "lucide-react";
import gsap from "gsap"
import { useGSAP } from '@gsap/react';

const Cards = ({title , ideal , price , features , index , className}) => {

  const isOdd = index % 2;

      return <div className={`card w-4/12 h-fit ${isOdd == 1 ? "bg-gray-100" : "bg-blue-100"} p-10 flex flex-col gap-5`}>
            {/* title */}
            <div>
              <p className='text-4xl font-anton text-white'>{title}</p>
            </div>

            {/* Ideal for */}
            <div>
              <p className='text-lg font-outfit text-gray-500'>{ideal}</p>
            </div>

            {/* pricing */}
            <div className='flex items-center gap-1'>
              <p className='text-3xl font-anton text-yellow-100 self-start'>$</p>
              <p className='text-7xl font-anton text-white'>{price}</p>
              <p className='font-outfit font-semibold text-yellow-100 self-end'>/MONTH</p>
            </div>

            {/* Features */}
            <div className='flex items-center gap-3'>
              <p className='text-yellow-100 font-outfit text-lg'>Features</p>
              <div className='w-full h-0 border-1 border-gray-200'></div>
            </div>

            {/* points */}
            <div className='flex flex-col gap-4'>
            {
              features.map((feature , index) => {
                  return<div key={index} className='flex gap-2'>
                    <img src={assets.bulletThree} className='size-6'/>
                    <p className='font-outfit text-gray-200'>{feature}</p>
                  </div>
              })
            }
            </div>

            {/* button */}
            <div className='border-2 border-yellow-100 text-white  p-3 flex justify-center gap-2 hover:bg-yellow-100  hover:text-black hover:scale-90 transition-all duration-300 ease-in'>
              <p className='font-anton text-lg'>GET STARTED</p>
              <CircleChevronRight color='#ffffff'/>
            </div>
      </div>
}

const CardSection = () => {

  const titleRef = useRef(null)

  useGSAP(() => {

    const t1 = gsap.timeline();

    t1.from(titleRef.current , {
      x:"-150px",
      opacity:0,
      ease:"power3.inOut",
      duration:1.5
    })
    t1.from(".card" , {
      y:"100px",
      opacity:0,
      ease:"power3.inOut",
      duration:1,
      stagger:1
    })
  })

  return (
    <div 
              className="relative min-h-screen w-screen overflow-x-hidden p-20"
      style={{
        backgroundColor: "#E3E3E3",
        backgroundImage: `url(${assets.eggShellBg})`,
      }}
    >
        {/* Top container */}
        <div className='absolute flex  w-3/6 flex-col gap-4 '>
            <div className='flex items-center gap-3'>
                <img src={assets.bulletThree} className='size-10'/>
                <p className='font-anton text-2xl text-gray-900'>CHOOSE YOUR PLAN</p>
            </div>

            <div ref={titleRef}>
                <p className='text-7xl font-anton text-gray-900 leading-20'>TAILORED PLANS FOR EVERY NEED </p>
            </div>
        </div>

        {/* Cards Section */}
        <div className='mt-32 top-32 flex items-end gap-5  w-full' >
          {
            pricingPlans.map((pack , index) => {
              return <Cards className="card" key={index} title={pack.name} ideal={pack.idealFor} price={pack.price} features={pack.features} index={index} />
            })
          }
        </div>
    </div>
  )
}

export default CardSection