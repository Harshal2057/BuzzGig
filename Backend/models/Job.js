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

    tags:{
        type:[String],
        enum:[ // Job Types
            "full-time", "part-time", "contract", "freelance", "internship", "remote", "hybrid", "on-site",
            
            // Industries
            "software development", "data science", "marketing", "design", "finance", "healthcare", 
            "education", "customer service", "sales", "engineering", "human resources", "legal", 
            "project management", "manufacturing", "real estate",
        
            // Programming & Tech Skills
            "JavaScript", "Python", "React", "Node.js", "MongoDB", "SQL", "AWS", "Docker", "DevOps", 
            "UI/UX", "Machine Learning", "Cybersecurity", "Swift", "Kotlin", "Flutter", "C++", "Rust",
        
            // Soft Skills
            "communication", "leadership", "teamwork", "problem-solving", "critical thinking", 
            "time management", "adaptability",
        
            // Salary Preferences
            "hourly", "fixed-price", "commission-based", "equity-based"]
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

     salaryType:{
        type:String,
        enum:["hourly" , "fixed-rate"],
        required:true
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