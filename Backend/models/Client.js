import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    contact:{
        type:String,
        required:true,
        validate:{
            validator: function(value) {
             return /^[0-9]{10}$/.test(value);
            },
             message: "Contact number must be a valid 10-digit number"
        }
    },

    address:{
        type:String,
        required:true
    },

    completedJob:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    }],

    pendingJob:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    }],

    payment:{
        type:String,
        default:""
    }

},
    {timestamps:true}
)

export default mongoose.model("Client" , clientSchema);