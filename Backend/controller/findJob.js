import Freelancer from "../models/Freelancer.js";
import Job from "../models/Job.js"

const getAllJob = async (req, res) => {
    try {
       const jobs = await Job.find().populate("postedBy", "fullName email");


        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            jobs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occurred while fetching jobs => ${error.message}`
        });
    }
};

const tagJobs = async (req, res) => {
    try {
        const tags = req.body.tags; 

        if (!Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Tags must be a non-empty array"
            });
        }

        const jobs = await Job.find({ tags: { $in: tags } });

        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found using the provided tags"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Jobs retrieved successfully",
            data: jobs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occurred while fetching jobs through tags => ${error.message}`
        });
    }
};

const findClientJobs = async(req , res) => {
    try {
            const clientId = req.params.clientId;

            if (!clientId) {
                return res.status(404).json({
                    success:false,
                    message:"Please provide the client id "
                })
            }

            const clientJobs = await Job.find({postedBy:clientId});

            return res.status(200).json({
                success:true,
                message:"Jobs retrived successfully !!",
                jobs : clientJobs
            })

    } catch (error) {
          return res.status(500).json({
            success: false,
            message: `Error occurred while fetching jobs => ${error.message}`
        });
    }
};

const favJobs = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user !!",
      });
    }

    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a job Id!!",
      });
    }

    const freelancer = await Freelancer.findOne({ userId: user._id });

    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: "Freelancer not found",
      });
    }

    let updateFreelancer;

    if (freelancer.favJobs.includes(jobId)) {

      updateFreelancer = await Freelancer.findByIdAndUpdate(
        freelancer._id,
        { $pull: { favJobs: jobId } },
        { new: true }
      ).populate("favJobs");
    } else {

      updateFreelancer = await Freelancer.findByIdAndUpdate(
        freelancer._id,
        { $addToSet: { favJobs: jobId } },
        { new: true }
      ).populate("favJobs");
    }

    return res.status(200).json({
      success: true,
      message: freelancer.favJobs.includes(jobId)
        ? "Job removed from favourites successfully"
        : "Job added to favourites successfully",
      favJobs: updateFreelancer.favJobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error occurred while toggling job favourites => ${error.message}`,
    });
  }
};

export {getAllJob , tagJobs , findClientJobs , favJobs};
  