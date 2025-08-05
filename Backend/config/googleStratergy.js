import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv"

import User from "../models/User.js";//User model

 dotenv.config();

passport.use("google", new GoogleStrategy({
  
    clientID:  process.env.GOOGLE_CLIENT_ID ,
    clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/auth/google/choose-role",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  },
  async function(request, accessToken, refreshToken, profile, cb) {
      try {
          const email = profile.emails[0].value;
          const name = profile.displayName;
          const profilePic = profile.photos[0].value;

          const user = await User.findOne({email});

          if (!user) {
            const newUser =await User.create({
              email,
              isGoogleUser:true,
              name,
              profilePic
            })
            console.log("New user created");
            return cb(null , newUser);
          }else{
            return cb(null , user);
          }
          

      } catch (error) {
        return cb(error);
      }  
  }
));

// Serialize user
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

//DeSerialize user
passport.deserializeUser(async(id, cb) => {
  try {
      const user = await User.findById(id);
      return cb(null , user)
  } catch (error) {
    return cb(error)
  }
});

export default passport;