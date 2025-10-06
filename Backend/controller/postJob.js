import Job from "../models/Job.js";
import Client from "../models/Client.js";

const postJob = async (req, res) => {
  try {
    const user = req.user;
   
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Only clients can post jobs",
      });
    }

    const client = await Client.findOne({ userId: user._id });

    const { title, description, tags, skills , mode, location, experienceLevel , salaryType, budget, duration , deadline } = req.body;


    if (!title || !description || !tags || !skills || !mode || !experienceLevel || !salaryType || !budget || !duration) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }


    const newJob = await Job.create({
      title,
      description,
      tags,
      skills,
      mode,
      location,
      experienceLevel,
      salaryType,
      budget,
      duration,
      deadline,
      postedBy:client._id
    });


    const updatedClient = await Client.findByIdAndUpdate(
      client._id,
      { $push: { jobs: newJob._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Job created successfully!",
      job: newJob,
      client: updatedClient,
    });

  } catch (error) {
    console.error("Error posting job:", error);
    return res.status(500).json({
      success: false,
      message: `Error occurred while posting job: ${error.message}`,
    });
  }
};

const deleteJob = async (req , res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success:false,
        message:"Unatuthorized user"
      })
    }

    if (user.role != "client") {
      return res.status(401).json({
        success:false,
        message:"Protected route for Client"
      })
    }

    const jobId = req.params.jobId;

    if (!jobId) {
      return res.status(401).json({
        success:false,
        message:"Please provide the jobid"
      })
    }

    const job = await Job.findById(jobId);

    if (!job) {
  return res.status(404).json({
    success: false,
    message: "Job not found",
  });
}

    
    const client = await Client.findOne({userId:user._id});

    if ( job.postedBy.toString() !== client._id.toString()) {
      return res.status(401).json({
        success:false,
        message:"A client can delete only his own job"
      })
    }

    await Job.findByIdAndDelete(jobId);

  await Client.findByIdAndUpdate(
    client._id,
    {
      $pull:{
        jobs:jobId
      }
    },
    {new:true}
   )

   return res.status(200).json({
    success:true,
    message:"Job deleted successfully"
   })


  } catch (error) {
    return res.status(500).json({
      success:false,
      message:`Error occured while deleting job => ${error}`
    })
  }
}

const getAllJobs = async(req ,res) => {

    try {
        
        const user = req.user;

        if (user.role !== "client") {
            return res.status(400).json({
                success:false,
                message:"Thsi is a protected route for client"
            })
        }

        const client  = await Client.findOne({userId:user.id} , {_id : 1});

        if (!client) {
            return res.status(400).json({
                success:false,
                message:"Client not found"
            })
        }

        const getAllJobs = await Job.find({postedBy : client._id});

        if (getAllJobs.length === 0) {
            return res.status(400).json({
                success:false,
                message:"NO job found "
            })
        }

        return res.status(200).json({
            success:true,
            message:"Job retrived successfully",
            getAllJobs
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while retriving job => ${error}`
    })
    }

}


export {postJob , deleteJob , getAllJobs};