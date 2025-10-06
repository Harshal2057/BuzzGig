import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import toast from "react-hot-toast";
import { StoreContext } from "../context/StoreContext";

const firebaseConfig = {
  apiKey: "AIzaSyDryBTgmL26TWrmE9aagEx57jZ64hsp6Vc",
  authDomain: "buzzgig-e9441.firebaseapp.com",
  projectId: "buzzgig-e9441",
  storageBucket: "buzzgig-e9441.firebasestorage.app",
  messagingSenderId: "370030751578",
  appId: "1:370030751578:web:26b4a87f709ea125430d63",
  measurementId: "G-ZYMP4WCRMH"
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function PhoneAuth() {
  const { user, setUser } = useContext(StoreContext);
  
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Setup reCAPTCHA
  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
    
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved
        },
        "expired-callback": () => {
          toast.error("reCAPTCHA expired. Please try again.");
        }
      }
    );
  };

  // Format phone number
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Add +91 if not present
    if (digits.length > 0 && !digits.startsWith('91')) {
      return '+91' + digits.slice(-10); // Take last 10 digits
    } else if (digits.startsWith('91')) {
      return '+' + digits;
    }
    return '+91';
  };

  const sendOtp = async () => {
    if (!phone || phone.length < 13) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      setupRecaptcha();
      const formattedPhone = formatPhoneNumber(phone);
      
      const result = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      setCountdown(60); // 60 second countdown
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      
      // Handle specific error cases
      if (error.code === 'auth/invalid-phone-number') {
        toast.error("Invalid phone number format");
      } else if (error.code === 'auth/too-many-requests') {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      console.log("Verified user:", result.user.phoneNumber);
      
      // Update user context with phone number
      const updatedUser = {
        ...user,
        phoneNumber: result.user.phoneNumber,
        phoneVerified: true
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setIsVerified(true);
      toast.success("Phone number verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      
      if (error.code === 'auth/invalid-verification-code') {
        toast.error("Invalid OTP. Please try again.");
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = () => {
    if (countdown === 0) {
      setOtp("");
      setOtpSent(false);
      sendOtp();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        {/* Phone Input */}
        {!otpSent && !isVerified && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* OTP Input */}
        {otpSent && !isVerified && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <p className="text-sm text-gray-500">
              OTP sent to {phone}
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
              maxLength="6"
            />
            
            <div className="flex space-x-2">
              <button
                onClick={verifyOtp}
                disabled={loading}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              
              <button
                onClick={resendOtp}
                disabled={countdown > 0}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {countdown > 0 ? `Resend (${countdown}s)` : "Resend OTP"}
              </button>
            </div>
          </div>
        )}

        {/* Verified State */}
        {isVerified && (
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-600 font-medium">Phone Number Verified!</p>
            <p className="text-sm text-gray-500">{phone}</p>
          </div>
        )}
      </div>
      
      {/* Hidden reCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default PhoneAuth;