import uploadPhoto from "../utils/photoUpload.js";
import User from "../models/User.js";
import Freelancer from "../models/Freelancer.js";
import Project from "../models/Project.js";
import Client from "../models/Client.js";

const updateClientProfile = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "client") {
      return res.status(400).json({
        success: false,
        message: "This is a protected route for Client",
      });
    }

    const { contact, address } = req.body;

    if (!contact && !address) {
      return res.status(401).json({
        success: false,
        message: "Atleast fill any one field to update",
      });
    }

    const updateObj = { $set: {} };

    if (contact != undefined) {
      updateObj.$set.contact = contact;
    }

    if (address != undefined) {
      updateObj.$set.address = address;
    }

    const updateClient = await Client.updateOne(
      { userId: user._id },
      updateObj
    );

    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
      updateClient,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error occured while updating client =>  ${error}`,
    });
  }
};

const getClientProfile = async(req , res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        success:false,
        message:"Unauthorized user"
      })
    }

    const ClientProfile = await Client.findOne({userId:user._id});

    if (!ClientProfile) {
      return res.status(404).json({
        success:false,
        message:"No client found !!"
      })
    }

    return res.status(200).json({
      success:true,
      message:"Client found !",
      client:ClientProfile
    })

  } catch (error) {
        return res.status(500).json({
      success: false,
      message: `Error occured while uploading background pic`,
    });
  }
}

const profilePic = async (req, res) => {
  try {
    //Requesting user from protected route
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const image = req.files.imageFiles;

    if (!image) {
      return res.status(401).json({
        success: false,
        message: "Please upload image ",
      });
    }

    const uploadResponse = await uploadPhoto(image, "profile_img");

    if (uploadResponse) {
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            profilePic: uploadResponse.secure_url,
          },
        },
        { new: true }
      );

      if (updatedUser) {
        return res.status(200).json({
          success: true,
          message: "Profile image updated successfully",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error occured while uploading background pic`,
    });
  }
};

const backgroundPic = async (req, res) => {
  try {
    const user = req.user;

    const role = user.role;

    if (role === "client") {
      return res.status(400).json({
        success: false,
        message: "This route is only for Freelancer",
      });
    }

    const freelancer = await Freelancer.findOne({ userId: user._id });

    if (!freelancer) {
      return res.status(401).json({
        success: false,
        message: "Freelancer not found",
      });
    }

    const image = req.files.imageFiles;

    const uploadResponse = await uploadPhoto(image, "Background_img");

    if (uploadResponse) {
      const updateFreelancer = await Freelancer.findByIdAndUpdate(
        freelancer._id,
        {
          $set: {
            backgroundPic: uploadResponse.secure_url,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Background pic uploaded successfully ",
        updateFreelancer,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error occured while uploading background image => ${error}`,
    });
  }
};

const freelancerProfile = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const freelancer = await Freelancer.findOne({ userId: user._id });

    if (!freelancer) {
      return res.status(401).json({
        success: false,
        message: "No freelancer found",
      });
    }

    const { location, github, contact } = req.body;

    const updateFields = {};

    if (location !== undefined && location !== "")
      updateFields.location = location;
    if (github !== undefined && github !== "") updateFields.github = github;
    if (contact !== undefined && contact !== "") updateFields.contact = contact;

    if (Object.keys(updateFields).length === 0) {
      return res.status(401).json({
        success: false,
        message: "No changes made to save",
      });
    }

    const updateFreelancer = await Freelancer.findByIdAndUpdate(
      freelancer._id,
      {
        $set: updateFields,
      },
      { new: true }
    );

    if (updateFreelancer) {
      return res.status(200).json({
        success: true,
        message: "Freelancer info updated successfully",
        updateFreelancer,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error occured while uploading Freelancer info => ${error}`,
    });
  }
};

const freelancerAbout = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (user.role !== "freelancer") {
      return res.status(401).json({
        success: false,
        message: "Protected route for freelancer",
      });
    }

    const freelancer = await Freelancer.findOne({ userId: user._id });

    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: "Freelancer not found !!",
      });
    }

    const { about } = req.body;

    if (!about || about.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "About section cannot be empty",
      });
    }


    const freelancerAboutUpdate = await Freelancer.findByIdAndUpdate(
      freelancer._id,
      { $set: { about: about } },
      { new: true }
    )

    if (!freelancerAboutUpdate) {
      return res.status(400).json({
        success: false,
        message: "Freelancer not Updated"
      })
    }
    return res.status(200).json({
      success: true,
      message: "About section updated successfully",
      data: freelancerAboutUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error occured while updateing About section => ${error}`
    })
  }
};

const freelancerSkills = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (user.role !== "freelancer") {
      return res.status(401).json({
        success: false,
        message: "Protected Route for Freelancer",
      });
    }

    const freelancer = await Freelancer.findOne({ userId: user._id });

    if (!freelancer) {
      return res.status(401).json({
        success: false,
        message: "No freelancer found",
      });
    }

    const { skill } = req.body;

    if (!skill || typeof skill !== "string") {
      return res.status(401).json({
        success: false,
        message: "Skill must be non-empty string"
      })
    }



    const updateFreelancer = await Freelancer.findByIdAndUpdate(
      freelancer._id,
      {
        $addToSet: { skills: skill }
      },
      { new: true }
    );

    if (updateFreelancer) {
      return res.status(200).json({
        success: true,
        message: "Changes saved",
        user: updateFreelancer,
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: `Error occured while updating about => ${error}`,
    });
  }
};

const freelancerEducation = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (user.role !== "freelancer") {
      return res.status(401).json({
        success: false,
        message: "Protected route for freelancer",
      });
    }

    const freelancer = await Freelancer.findOne({ userId: user._id });

    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: "No freelancer found !!",
      });
    }

    const { school, degree, field, startDate, endDate } = req.body;

    // Enhanced validation to match your schema
    if (!school || !degree || !field) {
      return res.status(400).json({
        success: false,
        message: "School, degree, and field of study are required",
      });
    }

    // Validate startDate according to your schema
    if (!startDate || !startDate.month || !startDate.year) {
      return res.status(400).json({
        success: false,
        message: "Start date with month and year is required",
      });
    }

    // Create the education object
    const newEducation = {
      school,
      degree,
      field,
      startDate: {
        month: startDate.month,
        year: startDate.year
      }
    };

    // Add endDate only if provided
    if (endDate && (endDate.month || endDate.year)) {
      newEducation.endDate = {
        month: endDate.month || "",
        year: endDate.year || null
      };
    }

    // Use findByIdAndUpdate instead of save() to avoid full document validation
    const updatedFreelancer = await Freelancer.findByIdAndUpdate(
      freelancer._id,
      {
        $push: { education: newEducation }
      },
      { new: true }
    );

    if (!updatedFreelancer) {
      return res.status(400).json({
        success: false,
        message: "Failed to add education",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Education added successfully",
      education: updatedFreelancer.education,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating the education",
      error: error.message,
    });
  }
};

const freelancerProject = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (user.role !== "freelancer") {
      return res.status(400).json({
        success: false,
        message: "This is protected Route for freelancer",
      });
    }

    const freelancer = await Freelancer.findOne({userId:user._id})

    if (!freelancer) {
      return res.status(404).json({
        success:false,
        message:"Freelancer not found"
      })
    }

    const { proj_name, proj_url, proj_desc } = req.body;

    if (
      ![proj_name, proj_url, proj_desc].every((field) => field && field.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }

    const updatedProjObject = {
      proj_name,
      proj_desc,
      proj_url
    }

    const updateFreelancer = await Freelancer.findByIdAndUpdate(
      freelancer._id,
      {
        $push:{
          projects:updatedProjObject
        }
      },
      {new:true}
    )

    if (!updateFreelancer) {
            return res.status(400).json({
        success: false,
        message: "Failed to add project",
      });
    }

        return res.status(200).json({
      success: true,
      message: "Project added successfully",
      project: updateFreelancer.projects
    });
 

 
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error occured while uploading Project => ${error}`,
    });
  }
};

const getFreelancerProfile = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized user !!"
      })
    }

    if (user.role !== "freelancer") {
      return res.status(400).json({
        success: false,
        message: "Protected route for Freelancer"
      })
    }

    const freelancer = await Freelancer.findOne({ userId: user._id });

    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: "Freelancer not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Freelancer fetched successfully",
      profile: freelancer
    })


  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error occured while Fetching Freelancer => ${error.message}`,
    });
  }
}


export {
  updateClientProfile,
  profilePic,
  backgroundPic,
  freelancerProfile,
  freelancerAbout,
  freelancerSkills,
  freelancerEducation,
  freelancerProject,
  getFreelancerProfile,
  getClientProfile
};
