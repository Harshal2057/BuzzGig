import {  Routes, Route , useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Navbar from "./components/Navbar.jsx";
import NavbarSec from "./components/NavbarSec.jsx";
import Authentication from "./components/Authentication.jsx";
import ChooseRole from "./pages/ChooseRole.jsx";
import  { Toaster } from 'react-hot-toast';
import FreelancerProfile from "./pages/FreelancerProfile.jsx";
import FreelancerDashboard from "./pages/FreelancerDashboard.jsx";
import ClientDashboard from "./pages/ClientDashboard.jsx";
import PostJob from "./pages/PostJob.jsx";
import ClientJobs from "./pages/ClientJobs.jsx";
import JobListings from "../src/pages/JobListings.jsx"
import ClientChat from "./components/Chatting/ClientChat.jsx";

function App() {

  const location = useLocation()

const hideNavbar = ["/auth", "/choose-role" , "/freelancer-dashboard" , "/client-dashboard" , "/client-job" , "/client-chats" ].includes(location.pathname);



    return <div>
        <Toaster />
        {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/freelancer-profile" element={<FreelancerProfile />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/client-job" element={<ClientJobs />} />
        <Route path="/all-jobs" element={<JobListings />} />
        <Route path="/client-chats" element={<ClientChat />} />
      </Routes>
    </div>
}

export default App;