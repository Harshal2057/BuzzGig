import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SlidingButtonGroup from "../utils/SlidingButtonGroup.jsx";
import { FcGoogle } from "react-icons/fc";
import { StoreContext } from "../context/StoreContext.jsx";
import { PasswordStrengthIndicator } from "./lightswind/password-strength-indicator.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader.jsx";

const Authentication = () => {
  const { url,  setIsLoggedIn, setUser ,isLoading , setIsLoading , setAuthUser} =
    useContext(StoreContext);

  const yellowRef = useRef(null);
  const formRef = useRef(null);

  const navigate = useNavigate();

  // const[] = useState(false)
  const [active, setActive] = useState("Login");
  const [formType, setFormType] = useState("Login");
  const [strength, setStrength] = useState("empty");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  useGSAP(() => {
    gsap.set(yellowRef.current, {
      clipPath: "polygon(0 0, 45% 0, 45% 100%, 0% 100%)",
    });

    gsap.set(formRef.current, {
      right: 0,
      width: "55%",
    });
  });

  useEffect(() => {
    if (!yellowRef.current) return;

    const tl = gsap.timeline();

    if (active === "Register") {
      // Smoother transition to Register
      tl.to(
        yellowRef.current,
        {
          duration: 0.8,
          clipPath: "polygon(15% 0, 85% 0, 85% 100%, 15% 100%)",
          ease: "power2.inOut",
        },
        "yellow"
      )
        .to(
          yellowRef.current,
          {
            duration: 0.8,
            clipPath: "polygon(55% 0, 100% 0, 100% 100%, 55% 100%)",
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          formRef.current,
          {
            duration: 0.8,
            right: "45%",
            ease: "power3.inOut",
          },
          "yellow"
        )
        .call(() => setFormType("Register"), null, 0.4);
    } else {
      // Smooth transition back to Login
      tl.to(
        yellowRef.current,
        {
          duration: 0.8,
          clipPath: "polygon(15% 0, 85% 0, 85% 100%, 15% 100%)",
          ease: "power2.inOut",
        },
        "yellow"
      )
        .to(
          yellowRef.current,
          {
            duration: 0.8,
            clipPath: "polygon(0% 0, 45% 0, 45% 100%, 0% 100%)",
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          formRef.current,
          {
            duration: 0.8,
            right: "0",
            ease: "power3.inOut",
          },
          "yellow"
        )
        .call(() => setFormType("Login"), null, 0.4);
    }
  }, [active]);

  //Form Updatation logic
  const handleFormChange = (e) => {
    const { name, checked, value, type } = e.target;

    setForm((prevValue) => {
      const updateForm = {
        ...prevValue,
        [name]: type === "checkbox" ? checked : value,
      };
      console.log(updateForm);
      return updateForm;
    });
  };

const handleSubmitForm = async (e) => {
  setIsLoading(true);
  e.preventDefault();

  //Check for the terms
  if (formType === "Register" && !form.terms) {
    toast.error("You must accept the Terms and Conditions to proceed.");
    setIsLoading(false); // Add this line
    return;
  }

  try {
    //Setting formdata to pass through request
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);

    let newUrl = url;

    //Setting the newurl according to the formType
    if (formType === "Register") {
      newUrl = newUrl + "/api/auth/signup";
    } else if (formType === "Login") {
      newUrl = newUrl + "/api/auth/login";
    }

    console.log(newUrl);

    const response = await axios.post(newUrl, formData, {
      withCredentials: true,
    });

    if (response.data.success) {
      console.log(response.data.user);
      
      const userData = {
        name: response.data.user.name,
        email: response.data.user.email,
        role: response.data.user.role || ""
      };

      setUser(userData);
      setAuthUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoggedIn(true);

      toast.success(
        formType === "Register"
        ? "User Registered Successfully !!"
        : "User logged in successfully !!"
      );

      if (!userData.role) {
        navigate("/choose-role");
      } else {
        navigate("/");
      }
    }

    setIsLoading(false);
  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("ERROR RESPONSE:", error.response?.data);
    
    setIsLoading(false); // Add this critical line
    
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong, please try again.");
    }
  }
};

  return (
    <div
      style={{
        backgroundImage: `url(${assets.eggShellBg})`,
        backgroundColor: "rgba(227, 227, 227)", // transparent gray
        backgroundBlendMode: "overlay",
      }}
      className="min-h-screen w-screen flex flex-col gap-5 overflow-hidden justify-center items-center bg-transparent"
    >
      <div className="relative w-[870px] h-[550px] ">
        {/* yellow  */}
        <div
          ref={yellowRef}
          className="absolute w-full h-full z-30 bg-yellow-100 flex justify-center items-center"
          style={{
            willChange: "clip-path", // Optimize for animations
          }}
        >
          <div>
            <img src={assets.loginImg} className="w-full h-full object-cover" />
          </div>
          <div>
            <img
              src={assets.RegisterImg}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form */}
        <div
          ref={formRef}
          className="form absolute top-0 h-full w-4/6 flex flex-col gap-3 z-20 bg-gray-200
             items-start p-12 shadow-xl"
        >
          {/* Heading */}
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 ">
              {/* logo */}
              <div className="bg-blue-100 w-fit p-1 rounded-xl">
                <img src={assets.BuzzGig_Logo} className="size-10" />
              </div>
              <p className="font-racing-sans-one  text-4xl">BuzzGig</p>
            </div>
            <p className="font-outfit text-gray-100">WELCOME BACK CREATIVE !</p>
          </div>

          {/* Sliding Button */}
          <div>
            <SlidingButtonGroup
              buttons={["Login", "Register"]}
              initialActive={0}
              className="w-full"
              onChange={(val) => setActive(val)}
            />
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handleSubmitForm}
            className="w-full flex flex-col gap-3"
          >
            {/* name */}
            {formType === "Register" && (
              <div className="border-2 border-gray-50 w-full p-2 rounded-full">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  id="name"
                  placeholder="Enter your name"
                  className="w-full bg-transparent font-outfit text-md focus:outline-none"
                  onChange={handleFormChange}
                />
              </div>
            )}

            {/* email */}
            <div className="border-2 border-gray-50 w-full p-2 rounded-full">
              <input
                type="text"
                name="email"
                value={form.email}
                id="email"
                placeholder="Enter your email"
                className="w-full bg-transparent font-outfit text-sm focus:outline-none"
                onChange={handleFormChange}
              />
            </div>

            {/* password */}
            <PasswordStrengthIndicator
              name="password"
              value={form.password}
              onChange={(val) =>
                handleFormChange({
                  target: { name: "password", value: val, type: "text" },
                })
              }
              onStrengthChange={(lvl) => setStrength(lvl)}
              label="Password"
              placeholder="Enter a secure password"
              className="text-4xl"
            />

            <div className="flex justify-between">
              {/* Checkbox */}
              {formType === "Register" && (
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={form.terms}
                    className="accent-blue-500 w-3 h-3 select-none"
                    onChange={handleFormChange}
                  />
                  <p className="text-sm font-outfit text-gray-500">
                    Agree to terms
                  </p>
                </label>
              )}

              {/* Forgot Password */}
              <div className="text-blue-500 text-sm font-outfit">
                <p>Forgot password</p>
              </div>
            </div>

            {/* Login  / Register*/}
            <button
              type="submit"
              className="w-full bg-blue-500 p-2 text-white text-center rounded-full font-outfit 
                          box-border border-2 border-transparent hover:border-blue-500 
                          hover:bg-white hover:text-blue-500"
            >
              <p>{formType}</p>
            </button>
          </form>

          {/* Google oAuth */}
          <div className="w-full -m-3 ml-1">
            {/* or */}
            <div className="w-full flex items-center gap-2">
              <div className="w-full h-0 border-1 border-gray-50" />{" "}
              <p className="font-outfit">or</p>{" "}
              <div className="w-full h-0 border-1 border-gray-50" />
            </div>

            {/* Google */}
            <div
              onClick={() => {
                window.location.href = `${url}/api/auth/google`;
              }}
              className="flex items-center gap-2 border-2 border-gray-50 p-2 rounded-full justify-center cursor-pointer"
            >
              <FcGoogle className="size-7" />
              <p className="font-outfit text-gray-500 cursor-pointer">
                Log in with Google
              </p>
            </div>
          </div>
        </div>
      </div>

  {isLoading && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-xs bg-black/30">
     <Loader />
    </div>
  )}

    </div>
  );
};

export default Authentication;
