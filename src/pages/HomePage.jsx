import React from "react";
import { Link } from "react-router-dom";
import { RiTodoFill } from "react-icons/ri";

import { motion } from "framer-motion";
function HomePage() {


  return (
    <>
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center"
      >
        <div className="w-80 border-4 border-black  bg-white p-6 shadow-[10px_10px_0_#000] font-sans">
          <div className="flex items-center gap-4 mb-4 border-b-2 border-black pb-4">
            <div className="flex-shrink-0 flex items-center justify-center bg-black p-2">
              <RiTodoFill className="text-white w-6 h-6" />
            </div>
            <div className="font-black text-black text-xl uppercase">
              Task Manager
            </div>
          </div>
          <div className="mt-4 text-black text-sm leading-6 border-b-2 border-black pb-4 font-semibold">
            This application is designed to help you manage your tasks
            effortlessly,In real time keeping you organized and productive.
          </div>
          <div className="mt-4">
            <Link
              to={"/my-tasks"}
              className="block w-full py-3 text-center text-base font-bold uppercase border-3 border-black bg-black text-white relative transition-all duration-200 ease-linear shadow-[5px_5px_0_#000] overflow-hidden hover:before:left-full hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#800000] hover:bg-green-600 hover:border-green-600 hover:text-white before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:transition-all before:duration-600 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              my tasks
            </Link>
            <Link
              to={"/tasks-analytics"}
              className="block w-full mb-4 py-3 text-center text-base font-bold uppercase border-3 border-black bg-white text-black relative transition-all duration-200 ease-linear shadow-[5px_5px_0_#000] overflow-hidden hover:before:left-full hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#000] hover:bg-[#296fbb] hover:border-[#296fbb] hover:text-white before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:transition-all before:duration-600"
            >
              See Task Statistics
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default HomePage;
