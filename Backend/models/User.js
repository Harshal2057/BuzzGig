import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true,
        match: [/.+@.+\..+/, 'Invalid email']
    },

    password:{
        type:String,
        required:true,
    },

    name:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["client" , "freelancer"],
        required:true
    },

    profilePic:{
        type:String
    },

},
    {timestamps:true}
)

export default  mongoose.model("User" , userSchema);