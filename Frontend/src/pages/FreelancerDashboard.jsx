import React, { useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import gsap from "gsap";
import DashBoardSidebar from "../components/Dashboard/DashBoardSidebar";
import Topbar from "../components/Dashboard/Topbar";
import EarningCard from "../components/Dashboard/EarningCard";
import ProjectStatus from "../components/Dashboard/ProjectStatus";
import BidDisplay from "../components/Dashboard/BidDisplay";
import Chats from "../components/Dashboard/Chats";
import ChartsDisplay from "../components/Dashboard/ChartsDisplay";
import Transaction from "../components/Dashboard/Transaction";
import RecentClients from "../components/Dashboard/RecentClients";
import { StoreContext } from "../context/StoreContext";
import { useContext } from "react";

const FreelancerDashboard = () => {

  const{fetchFreelancer , checkSession , freelancerProfile} = useContext(StoreContext)

  const chartRef = useRef();

      useEffect(() => {
      fetchFreelancer();
      checkSession();
    },[])

    useEffect(() => {
  if (freelancerProfile) {
    console.log("Freelancer profile =>", freelancerProfile);
  }
}, [freelancerProfile]);

  useEffect(() => {
    if (chartRef.current) {
      gsap.set(chartRef.current, {
        clipPath:
          "path('M-1 18Q0 0 24 2H230Q250 0 249 21V71Q250 90 274 89H776Q800 90 800 111V476Q800 500 778 504H17Q0 500 0 480Z')",
      });
    }
  }, []);

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{
        backgroundColor: "#E6E6FA",
        backgroundImage: `url(${assets.eggShellBg})`,
      }}
    >
      {/* Main Container */}
      <div className="relative h-screen w-full flex p-3">
        {/* SideBar */}
        <div className=" w-1/6 h-full sticky">
          <DashBoardSidebar />
        </div>

        {/* Right div */}
        <div className="w-5/6  p-2 overflow-y-auto h-auto">
          {/* Top bar */}
          <Topbar />

          <div className="flex w-full gap-6 p-4 ">
            <EarningCard />
            <ProjectStatus />
            <BidDisplay />
            <Chats />
          </div>

          {/* Charts */}
          <div
            ref={chartRef}
            style={{
              backgroundColor: "#F8F8FF",
              backgroundImage: `url(${assets.eggShellBg})`,
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            }}
            className="relative bottom-65 left-4 w-[800px] h-[470px] flex flex-col rounded-2xl my-6 p-4 "
          >
            <div className="font-outfit text-2xl font-semibold mb-4">
              <p>Performance</p>
            </div>
            <ChartsDisplay />
          </div>

          {/* Transaction */}
          <div className="relative bottom-[70%] right-3 w-[370px] ml-auto my-6 ">
            <Transaction />
          </div>

          {/* Recent Client */}
          <div className="my-6 relative bottom-[70%] ">
            <RecentClients />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
