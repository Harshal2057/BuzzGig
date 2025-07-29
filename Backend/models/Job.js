import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true,
    },

    mode:{
        type:String,
        enum:["remote" , "on-location"],
        required:true,
        index:true
    },

    location:{
        type:String,
         validate: {
    validator: function (value) {
     
      if (this.mode === "on-location") {
        return typeof value === 'string' && value.trim().length > 0;
      }
      return true;
    },
    message: "Location is required when mode is 'on-location'."
  }
    },

    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:true,
        index:true
    },

    budget:{
        type:Number,
        required:true
    },

    startDate:{
        type:Date
    },

     endDate:{
        type:Date
    },

    bids:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bid"
    }],

    status:{
        type:String,
        enum:["open" , "in-progress" , "closed"],
        default:"open",
        index:true
    },

    assignFreelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Freelancer"
    }

},
    {timestamps:true}
)

export default mongoose.model("Job" , jobSchema);