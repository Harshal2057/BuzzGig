import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const JobStoreContext = createContext(null);

const JobStoreContextProvider = (props) => {
  const url = "http://localhost:4000";

  const [postJob, setPostJob] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState({});
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    tags: "",
    skills: [],
    mode: "",
    location: "",
    experienceLevel: "",
    salaryType: "",
    budget: "",
    duration: "",
    deadline: "",
  });
  const [clientJobs, setClientJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [favJobs, setFavJobs] = useState([]);

  // Fetch client profile
  const fetchClientProfile = async () => {
    try {
      const newUrl = url + "/api/profile/get-client";

      const Response = await axios.get(newUrl, { withCredentials: true });

      if (Response.data.success) {
        setClient(Response.data.client); // this will trigger the next effect
      }
    } catch (error) {
          console.log(error.response.data.message);
          
    }
  };

  // Post job
  const jobPost = async (jobForm) => {
    try {
      setIsLoading(true);

      if (!jobForm) return;

      const newUrl = url + "/api/job/postjob";

      const Response = await axios.post(newUrl, jobForm, {
        withCredentials: true,
      });

      if (Response.data.success) {
        toast.success("Job posted successfully!");
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

  // Find client jobs
  const findClientJobs = async (clientId) => {
    try {
      setIsLoading(true);

      if (!clientId) return;

      const newUrl = url + `/api/findjob/clientjobs/${clientId}`;

      const Response = await axios.get(newUrl);

      if (Response.data.success) {
        setClientJobs(Response.data.jobs);
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

  //Find all jobs
  const findAllJobs = async () => {
    try {
      setIsLoading(true);

      let newUrl = url + "/api/findjob/findalljobs";

      const Response = await axios.get(newUrl);

      if (Response.data.success) {
        setAllJobs(Response.data.jobs);
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

  //Toggle favjobs
  const favouriteJobs = async (jobId) => {
    try {

      
      if (!jobId) return;
      
      let newUrl = url + `/api/findjob/favJobs/${jobId}`;
      
      const Response = await axios.patch(
       newUrl,
        {}, 
        { withCredentials: true }
      );
      


      if (Response.data.success) {
        setFavJobs(Response.data. favJobs);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  // Automatically fetch jobs whenever client is loaded
  useEffect(() => {
    if (client?._id) {
      findClientJobs(client._id);
    }
  }, [client?._id]);

  // Fetch client profile on context mount
  useEffect(() => {
    fetchClientProfile();
    findAllJobs();
  }, []);



  const jobStoreData = {
    postJob,
    setPostJob,
    jobPost,
    jobForm,
    setJobForm,
    clientJobs,
    fetchClientProfile,
    client,
    findClientJobs,
    isLoading,
    allJobs,
    setAllJobs,
    favJobs,
    setFavJobs,
    favouriteJobs,
  };

  return (
    <JobStoreContext.Provider value={jobStoreData}>
      {props.children}
    </JobStoreContext.Provider>
  );
};

export default JobStoreContextProvider;
