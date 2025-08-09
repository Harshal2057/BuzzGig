import uploadPhoto from "../utils/photoUpload.js";
import User from "../models/User.js";
import Freelancer from "../models/Freelancer.js";
import Project from "../models/Project.js";
import Client from "../models/Client.js";


const updateClientProfile = async(req ,res) => {

    try {
        
        const user = req.user;

        if (user.role !== "client") {
            return res.status(400).json({
                success:false,
                message:"This is a protected route for Client"
            })
        }

        const {contact , address } = req.body;

        if (!contact && !address) {
            return res.status(401).json({
                success:false,
                message:"Atleast fill any one field to update"
            })
        }
       
        const updateObj = { $set:{}};

        if (contact != undefined) {
            updateObj.$set.contact = contact
        }

        if(address != undefined){
            updateObj.$set.address = address
        }


        const updateClient = await Client.updateOne(
            {userId:user._id},
            updateObj
        )

        return res.status(200).json({
            success:true,
            message:"Client updated successfully",
            updateClient
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while updating client =>  ${error}`
        })
    }

}

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

        if (user.role !== "freelancer") {
            return res.status(401).json({
                success:false,
                message:"Protected Route for Freelancer"
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

        const updateObj = {};

if (about !== undefined) {
    updateObj.$set = updateObj.$set || {};
    updateObj.$set.about = about;
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
            updateObj,
            {new:true}
        )

        if (updateFreelancer) {
            return res.status(200).json({
                success:true,
                message:"Changes saved"
            })
        }

    } catch (error) {
            return res.status(501).json({
                success:false,
                message:`Error occured while updating about => ${error}`
            })
    }
}

const freelancerProject = async(req ,res) => {

    try {
        
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success:false,
                message:"Unauthorized user"
            })
        }

        if (user.role !== "freelancer") {
            return res.status(400).json({
                success:false,
                message:"This is protected Route for freelancer"
            })
        }

        const {proj_name , proj_url ,proj_desc } = req.body;

     if (![proj_name, proj_url, proj_desc].every(field => field && field.trim())) {
    return res.status(400).json({
        success: false,
        message: "Please fill all the required fields"
    });
}


        const newProject = await Project.create({
            userId:user._id,
            proj_name:proj_name,
            proj_url:proj_url,
            proj_desc:proj_desc
        })

        console.log("Project created successfully");

        const addProject = await Freelancer.findOneAndUpdate(
           {userId : user._id},
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

export {updateClientProfile, profilePic, backgroundPic, freelancerProfile ,freelancerInfo , freelancerProject};
