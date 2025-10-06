import React, { useContext , useEffect } from 'react'
import { JobStoreContext } from '../../context/JobStore'

const Budget = () => {

  const {jobForm , setJobForm} = useContext(JobStoreContext);

      useEffect(() => {
            console.log(jobForm);
            
      },[jobForm])
  

  return (
    <div className="w-full mt-5 flex justify-center items-center ">
        {/* Main Container */}
        <div className='relative w-5/6'>
          {/* Radio button */}
          <div className='flex flex-col gap-3 '>
            <div>
                 <p className='text-lg text-gray-600 font-outfit'>Project type</p>
            </div>
            <div className='flex gap-3 w-full '>
               <label htmlFor='hourly' className='flex gap-3 justify-between border-2 p-3 rounded-lg font-outfit w-2/6'>
                  <p>Hourly rate</p>
                  <input type="radio" name="projectType" value="hourly" checked={jobForm.salaryType === "hourly"} id="hourly" 
                    onChange={(e) => setJobForm((prev) => ({...prev , salaryType:e.target.value}))}
                  />
               </label>

                <label htmlFor='fixed' className='flex gap-3 justify-between border-2 p-3 rounded-lg font-outfit w-2/6'>
                  <p>Fixed rate</p>
                  <input type="radio" name="projectType" value="fixed" checked={jobForm.salaryType === "fixed"} id="fixed" 
                     onChange={(e) => setJobForm((prev) => ({...prev , salaryType:e.target.value}))}
                  />
               </label>
            </div>
          </div>

          {/* Maximum Budget */}
          <div>
            <p className='text-lg font-outfit text-gray-600'>Maximum Project (USD)</p>
            <input type="text" name="maxBudget" value={jobForm.budget} id=""  className='border-1 focus:outline-none rounded-lg p-3 font-outfit text-gray-600'
              onChange={(e) => setJobForm((prev) => ({...prev , budget:e.target.value}))}
            />
          </div>
          <p className='font-outfit text-gray-600'>You will have the option to create milestones which divide your project into manageable phases.</p>
        </div>
    </div>
  )
}

export default Budget