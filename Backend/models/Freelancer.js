import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    contact: {
        type: String,
        default: "",
         match: [/^\d{10}$/, 'Contact must be a 10-digit number']
    },

    about: {
        type: String,
        default: ""
    },

    location: {
        type: String,
        default: ""
    },

    backgroundPic: {
        type: String,
        default:""
    },

    education: {
        type: [String],
        default: []
    },

    skills: {
        type: [String],
        default: []
    },

    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],

    bids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid"
    }],
    assignedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }],
    completedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }],
    pendingJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }],


    earning: {
        type: Number,
        default: 0
    }

},
{timestamps:true}
)

export default mongoose.model("Freelancer" , freelancerSchema);