import { Button } from "@/components/ui/button";
import {
  FaInstagram,
  FaGithub,
  FaUserTie,
  FaBriefcase,
  FaRocket,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E3A8A] text-white p-6 relative">
      {/* Background Blob */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A] to-[#000814] opacity-50"></div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl relative">
        <img
          src="https://cdn.pixabay.com/photo/2020/10/21/21/55/man-5674344_1280.png"
          alt="Hero Image"
          className="w-64 md:w-80 h-auto shadow-lg rounded-lg"
        />
        <div className="text-center md:text-left ml-0 md:ml-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#FFFFFF]">
            GetAJob
          </h1>
          <p className="text-lg md:text-xl text-[#F3F4F6] max-w-xl">
            AI-powered job portal that connects the right talent with the right
            opportunities.
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex space-x-4 relative"
      >
        <Button
          className="bg-[#F3F4F6] hover:bg-[#FFFFFF] text-[#1E3A8A] px-6 py-3 text-lg rounded-lg "
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          Login
        </Button>
        <Button
          className="bg-[#FFFFFF] hover:bg-[#F3F4F6] text-[#1E3A8A] px-6 py-3 text-lg rounded-lg"
          onClick={() => {
            navigate("/auth/register/user");
          }}
        >
          Sign Up
        </Button>
      </motion.div>

      {/* Social Media */}
      <div className="mt-6 flex space-x-4 relative">
        <Link
          to="https://instagram.com"
          className="text-[#FFFFFF] text-2xl hover:text-[#F3F4F6]"
        >
          <FaInstagram />
        </Link>
        <Link
          to="https://github.com/Keerthan04/GetAJob"
          className="text-[#FFFFFF] text-2xl hover:text-[#F3F4F6]"
        >
          <FaGithub />
        </Link>
      </div>

      {/* Benefits Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center relative">
        <div className="flex flex-col items-center">
          <FaUserTie className="text-4xl text-[#FFFFFF] mb-2" />
          <h3 className="text-xl font-semibold">For Job Seekers</h3>
          <p className="text-md text-[#F3F4F6] max-w-xs">
            Get AI-powered job recommendations tailored to your skills.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <FaBriefcase className="text-4xl text-[#FFFFFF] mb-2" />
          <h3 className="text-xl font-semibold">For Employers</h3>
          <p className="text-md text-[#F3F4F6] max-w-xs">
            Find the best candidates through AI-based filtering.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <FaRocket className="text-4xl text-[#FFFFFF] mb-2" />
          <h3 className="text-xl font-semibold">Fast Hiring</h3>
          <p className="text-md text-[#F3F4F6] max-w-xs">
            Speed up the hiring process with automated resume parsing.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-12 text-center relative">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">
          How It Works
        </h2>
        <p className="text-md text-[#F3F4F6] max-w-lg">
          Sign up, upload your resume, and let our AI match you with the perfect
          job.
        </p>
      </div>

      {/* Newsletter Subscription */}
      {/* <div className="mt-12 text-center relative">
        <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">
          Stay Updated
        </h2>
        <p className="text-md text-[#F3F4F6] max-w-lg mb-4">
          Subscribe to get the latest job trends and AI-driven insights.
        </p>
        <div className="flex items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-lg text-black"
          />
          <Button className="bg-[#FFFFFF] text-[#1E3A8A] px-4 py-2 rounded-r-lg">
            Subscribe
          </Button>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-[#F3F4F6] relative">
        &copy; {new Date().getFullYear()} GetAJob. All rights reserved.
      </footer>
    </div>
  );
}
