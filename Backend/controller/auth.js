import validator from "validator"
import bcrypt from "bcrypt"
import generateToken from "../utils/Token.js";



//Local
import User from "../models/User.js";
import Freelancer from "../models/Freelancer.js";

//Register
const signUp = async (req, res) => {

    const saltRounds = 10;

    try {
        let { name, email, password } = req.body;

        //Checking whether all fields are filled
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields !!"
            })
        }

        name = name.trim();
        email = email.trim().toLowerCase();
        password = password.trim();

        //Checking whether email is valid or not
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid email address"
            })
        }

        //Checking if user exists already
        const checkExistingUser = await User.findOne({ email });

        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "User already existed , Please try logging in "
            })
        }//To do : Redirect to login

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        //hashing password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        //creating new user
        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        })

        if (newUser) {
            const userResponse = newUser.toObject();
            delete userResponse.password;

            //Generate Token
            const token = generateToken(newUser._id, res);

            return res.status(201).json({
                success: true,
                message: "New user created successfully!!",
                user: userResponse,
                token
            })
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occured while Sign-Up => ${error}`
        })
    }
}

//Local login
const login = async (req, res) => {
    try {

        let { email, password } = req.body;

        //Checking whether all the fields are required
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }

        email = email.trim();
        password = password.trim();

        //Check whether user exists
        const checkUser = await User.findOne({ email });

        if (!checkUser) {
            return res.status(401).json({
                success: false,
                message: "User dont exist , try signing up"
            })
        }

        //Checking password 
        const checkPassword = await bcrypt.compare(password, checkUser.password);

        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password !!"
            })
        }

        //Generate token

        const token = generateToken(checkUser._id, res)

        return res.status(201).json({
            success: true,
            message: "User logged in successfully ",
            token
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occured while logging in => ${error}`
        })
    }
}

const checkAuth = async (req, res) => {
    try {

        //Returning the logged in user
        res.status(201).json(req.user);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occured in checkAuth => ${error}`
        })
    }
}

const logOUt = async (req ,res) => {
    try {
        //Clearing cookie
        res.cookie("jwtToken", "", { maxAge: 0, expires: new Date(0) });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occured in checkAuth => ${error}`
        })
    }
}

const updateRole = async (req, res) => {
    try {

        const { role } = req.body;
        const user = req.user;

        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required",
            });
        }

        const allowedRoles = ["client", "fre     elancer"];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role. Allowed roles are 'client' and 'freelancer'."
            });
        }


        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    role: role
                }
            },
            { new: true }
        )

              if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

      if (role === "freelancer") {
        const existingFreelancer = await Freelancer.findOne({userId: user._id});

        if (!existingFreelancer) {
            await Freelancer.create({
                userId:user._id
            })
        }

      }

            return res.status(201).json({
                success: true,
                message: "User role updated successfully !!",
                user: updatedUser
            })
        


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occured while updating role => ${error}`
        })
    }
}

export { signUp, logOUt, login, checkAuth, updateRole };