import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String
    },

    email: {
        type: String
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

    github: {
        type: String,
        default: ""
    },

    location: {
        country: { type: String },
        city: { type: String }
    },

    backgroundPic: {
        type: String,
        default: ""
    },

    education: [
        {
            school: { type: String, required: true },
            degree: { type: String, required: true },
            field: { type: String, required: true },
            startDate: {
                month: { type: String, required: true },
                year: { type: Number, required: true }
            },
            endDate: {
                month: { type: String },
                year: { type: Number }
            }
        }
    ],

    skills: {
        type: [String],
        default: []
    },

    projects: [{
        proj_name: {
            type: String,
            required: true
        },

        proj_url: {
            type: String,
            required: true
        },

        proj_desc: {
            type: String,
            required: true
        },
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

    favJobs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }],

    earning: {
        type: Number,
        default: 0
    }

},
    { timestamps: true }
)

export default mongoose.model("Freelancer", freelancerSchema);