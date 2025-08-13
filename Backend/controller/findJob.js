import Job from "../models/Job.js"

const getAllJob = async (req, res) => {
    try {
       const jobs = await Job.find();


        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: jobs
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

export {getAllJob , tagJobs};
  