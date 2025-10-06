import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    fullName:{
        type:String,
        required:true
    },

    contact:{
        type:String,
        validate:{
            validator: function(value) {
             return /^[0-9]{10}$/.test(value);
            },
             message: "Contact number must be a valid 10-digit number"
        }
    },

    email:{
        type:String,
        required:true
    },

    address:{
        type:String,
    },

    jobs:[
         {type:mongoose.Schema.Types.ObjectId,
        ref:"Job"}
    ],

    completedJob:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    }],

    pendingJob:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    }],

paymentHistory: [{
  amount: Number,
  date: { type: Date, default: Date.now }
}]


},
    {timestamps:true}
)

export default mongoose.model("Client" , clientSchema);