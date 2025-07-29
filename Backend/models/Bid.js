import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({

    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
        index:true
    },

    freelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Freelancer",
        required:true,
        index:true
    },

    amount:{
        type:Number,
        required:true
    },

    proposal:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:["pending" , "accepted" , "rejected"],
        default:"pending",
        index:true
    }

},
    {timestamps:true}
)

bidSchema.index({ job: 1, freelancer: 1 }, { unique: true });

export default mongoose.model("Bid" , bidSchema);