import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [updateBackGroundPic, setUpdateBackGroundPic] = useState(false);
  const [updateProfilePic, setUpdateProfilePic] = useState(false);
  const [profileInput, setProfileInput] = useState(null);
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [freelancerProfile, setFreelancerProfile] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [formData, setFormData] = useState({
    info: {
      contact: "",
      location: { country: "", city: "" },
      github: "",
    },
    summary: "",
    skills: "",
    education: {
      school: "",
      degree: "",
      field: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
    },
    project: {
      proj_name: "",
      proj_desc: "",
      proj_url: "",
    },
  });

  const [authUser, setAuthUser] = useState(null);




  //Check-auth
  const checkSession = async () => {
    try {
      const response = await axios.get(`${url}/api/auth/checkauth`, {
        withCredentials: true,
      });

      // console.log("Check-auth =>", response.data);
      if (response.data) {
        const userData = {
          name: response.data.name,
          email: response.data.email,
        };

        setUser(userData);
        setProfileUser(response.data);
        setAuthUser(response.data);

        localStorage.setItem("user", JSON.stringify(userData));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("No active session", error.response?.data?.message);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  //load user data
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setIsLoading(true);

        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user"); // Clean up invalid data
      }
    }

    checkSession();
  }, []);

  //Logout
  const logOut = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${url}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setUser(null);
        setAuthUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        toast.success("User logged out successfully");
      }
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update user role
  const updateUserRole = async (role) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${url}/api/auth/updaterole`,
        { role },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("User role updated successfully !!");
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  //Upload photos
  const uploadPhoto = async (file, type) => {
    try {
      setIsLoading(true);
      if (!file) return;

      let newUrl = url;

      if (type === "profile") {
        newUrl += "/api/profile/upload-profile-pic";
      } else if (type === "background") {
        newUrl += "/api/profile/upload-background-pic";
      }

      const formData = new FormData();
      formData.append("imageFiles", file);

      const Response = await axios.post(newUrl, formData, {
        withCredentials: true,
      });

      if (Response.data.success) {
        if (type === "profile") {
          toast.success("Profile Pic uploaded successfully !!");
        } else {
          toast.success("Background Pic uploaded successfully !!");
        }
        return Response.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  //fetch freelancer
  const fetchFreelancer = async () => {
    try {
      const Response = await axios.get(`${url}/api/profile/get-freelancer`, {
        withCredentials: true,
      });

      if (Response.data.success) {
        setFreelancerProfile(Response.data.profile);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  //Update Profile
  const updateProfile = async (formData, formType) => {
    try {
      setIsLoading(true);

      if (!formData) return;

      let newUrl = url + "/api/profile";

      let payload;

      if (formType === "Info") {
        newUrl += "/updatefreelancer";
        payload = formData.info;
      } else if (formType === "Summary") {
        newUrl += "/updatefreelancerabout";
        payload = { about: formData.summary };
      } else if (formType === "Skills") {
        newUrl += "/updatefreelancerskills";
        payload = { skill: formData.skills };
      } else if (formType === "Education") {
        newUrl += "/updatefreelancereducation";
        payload = formData.education;
      } else if (formType === "Projects") {
        newUrl += "/uploadproject";
        payload = formData.project;
      }

      const Response = await axios.post(newUrl, payload, {
        withCredentials: true,
      });

      if (Response.data.success) {
        toast.success("Info Successfully Updated");
        return Response.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };





  const contextData = {
    url,
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
    logOut,
    user,
    setUser,
    updateUserRole,
    isLoading,
    setIsLoading,
    updateBackGroundPic,
    setUpdateBackGroundPic,
    updateProfilePic,
    setUpdateProfilePic,
    uploadPhoto,
    fetchFreelancer,
    freelancerProfile,
    profileUser,
    checkSession,
    profileInput,
    setProfileInput,
    formData,
    setFormData,
    updateProfile,
    setAuthUser,
    authUser
  };

  return (
    <StoreContext.Provider value={contextData}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
