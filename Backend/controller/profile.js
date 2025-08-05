import uploadPhoto from "../utils/photoUpload.js";
import User from "../models/User.js";
import Freelancer from "../models/Freelancer.js";
import Project from "../models/Project.js";


const profilePic = async (req, res) => {
    try {

        //Requesting user from protected route
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            })
        }

        const image = req.files.imageFiles;

        if (!image) {
            return res.status(401).json({
                success: false,
                message: "Please upload image "
            })
        }

        const uploadResponse = await uploadPhoto(image, "profile_img")

        if (uploadResponse) {
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        profilePic: uploadResponse.secure_url
                    }
                },
                { new: true }
            )

            if (updatedUser) {
                return res.status(200).json({
                    success: true,
                    message: "Profile image updated successfully"
                })
            }
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occured while uploading background pic`
        })
    }
}

const backgroundPic = async (req, res) => {

    try {
        const user = req.user;

        const role = user.role;

        if (role === "client") {
            return res.status(400).json({
                success: false,
                message: "This route is only for Freelancer"
            })
        }

        const freelancer = await Freelancer.findOne({ userId: user._id });

        if (!freelancer) {
            return res.status(401).json({
                success: false,
                message: "Freelancer not found"
            })
        }

        const image = req.files.imageFiles;

        const uploadResponse = await uploadPhoto(image, "Background_img");

        if (uploadResponse) {

            const updateFreelancer = await Freelancer.findByIdAndUpdate(
                freelancer._id,
                {
                    $set: {
                        backgroundPic: uploadResponse.secure_url
                    }
                },
                { new: true }
            )

            return res.status(200).json({
                success: true,
                message: "Background pic uploaded successfully ",
                updateFreelancer
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error occured while uploading background image => ${error}`
        })
    }

}

const freelancerProfile = async (req, res) => {

    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            })
        }

        const freelancer = await Freelancer.findOne({ userId: user._id });

        if (!freelancer) {
            return res.status(401).json({
                success: false,
                message: "No freelancer found"
            })
        }


        const { location, github, contact } = req.body;

        const updateFields = {};

        if (location !== undefined && location !== "") updateFields.location = location;
        if (github !== undefined && github !== "") updateFields.github = github;
        if (contact !== undefined && contact !== "") updateFields.contact = contact;

        if (Object.keys(updateFields).length === 0) {
            return res.status(401).json({
                success: false,
                message: "No changes made to save"
            })
        }

        const updateFreelancer = await Freelancer.findByIdAndUpdate(
            freelancer._id,
            {
                $set: updateFields
            },
            { new: true }
        )

        if (updateFreelancer) {
            return res.status(200).json({
                success: true,
                message: "Freelancer info updated successfully",
                updateFreelancer
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Error occured while uploading Freelancer info => ${error}`
        })
    }

}

const freelancerInfo = async (req, res) => {

    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            })
        }

        const freelancer = await Freelancer.findOne({ userId: user._id });

        if (!freelancer) {
            return res.status(401).json({
                success: false,
                message: "No freelancer found"
            })
        }

        const {about , skills , education} = req.body;

        const updatedObj = {};

        if (about !== undefined) {
            updatedObj.$set = {about}
        }

       if (Array.isArray(skills) && skills.length > 0) {
  updateObj.$push = updateObj.$push || {};
  updateObj.$push.skills = { $each: skills };
}


if (Array.isArray(education) && education.length > 0) {
  updateObj.$push = updateObj.$push || {};
  updateObj.$push.education = { $each: education };
}


        const updateFreelancer = await Freelancer.findByIdAndUpdate(
            freelancer._id,
            {
                $set:updatedObj
            },
            {new:true}
        )

        if (updateFreelancer) {
            return res.status(200).json({
                success:true,
                message:"Changes saved"
            })
        }

    } catch (error) {
            return res.status(501).jsom({
                success:false,
                message:`Error occured while updating about => ${error}`
            })
    }
}

const freelancerProject = async(req ,res) => {

    try {
        
        const {proj_name , proj_url ,proj_desc } = req.body;
        const user = req.user;

        if (!proj_name || !proj_url || !proj_desc) {
            return res.status(400).json({
                success:false,
                message:"Please fill the required filled"
            })
        }

        const newProject = await Project.create({
            userId:user._id,
            proj_name:proj_name,
            proj_url:proj_url,
            proj_desc:proj_desc
        })

        if (!newProject) {
            return res.status(400).json({
                success: false,
                message: "Error occurred while creating Project"
            });
        }

        console.log("Project created successfully");

        const addProject = await Freelancer.findOneAndUpdate(
           {UserId : user.id},
            {
                $push:{
                    projects:newProject._id
                }
            },
            {new:true}
        )
        
        if (!addProject) {
            return res.status(400).json({
                success:false,
                message:"Couldn't add the projects"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Project uploaded successfully",
            newProject,
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while uploading Project => ${error}`
        })
    }

}

export { profilePic, backgroundPic, freelancerProfile ,freelancerInfo , freelancerProject};
