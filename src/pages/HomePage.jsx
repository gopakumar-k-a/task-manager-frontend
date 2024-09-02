import React from "react";
import { Link } from "react-router-dom";
import { socketContext } from "../context/SocketContext";
import { useContext } from "react";
import { RiTodoFill } from "react-icons/ri";
function HomePage() {
  const { userId } = useContext(socketContext);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-80 border-4 border-black  bg-white p-6 shadow-[10px_10px_0_#000] font-sans">
          <div className="flex items-center gap-4 mb-4 border-b-2 border-black pb-4">
            <div className="flex-shrink-0 flex items-center justify-center bg-black p-2">
              {/* <svg
            className="h-6 w-6 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
          </svg> */}
              <RiTodoFill className="text-white w-6 h-6" />
            </div>
            <div className="font-black text-black text-xl uppercase">
              Task Manager
            </div>
          </div>
          <div className="mt-4 text-black text-sm leading-6 border-b-2 border-black pb-4 font-semibold">
            This is a brutalist card with a very angry button. Proceed with
            caution, you've been warned.
          </div>
          <div className="mt-4">
            <li className="block w-full mb-4 py-3 text-center text-base font-bold uppercase border-3 border-black bg-white text-black relative transition-all duration-200 ease-linear shadow-[5px_5px_0_#000] overflow-hidden hover:before:left-full hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#000] hover:bg-[#296fbb] hover:border-[#296fbb] hover:text-white before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:transition-all before:duration-600">
              See Task Statistics
            </li>
            <li className="block w-full py-3 text-center text-base font-bold uppercase border-3 border-black bg-black text-white relative transition-all duration-200 ease-linear shadow-[5px_5px_0_#000] overflow-hidden hover:before:left-full hover:transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#800000] hover:bg-green-600 hover:border-green-600 hover:text-white before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:transition-all before:duration-600 active:translate-x-1 active:translate-y-1 active:shadow-none">
              Add New Tasks
            </li>
          </div>
        </div>
      </div>
      {/* <div className="text-center my-10">
        <h1 className="text-4xl font-bold mb-6">Welcome to Task Manager!</h1>
        <p>User ID: {userId}</p>
        <p className="text-lg mb-10">
          Manage your tasks efficiently by using the options below:
        </p>

        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/tasks"
            className="text-blue-600 hover:underline text-2xl"
          >
            View Tasks
          </Link>
          <p className="text-gray-700">
            See all your tasks and keep track of your progress.
          </p>

          <Link
            to="/add-task"
            className="text-blue-600 hover:underline text-2xl"
          >
            Add New Task
          </Link>
          <p className="text-gray-700">
            Create a new task to manage your work more effectively.
          </p>

          <Link to="/profile" className="text-blue-600 hover:underline text-2xl">
            My Profile
          </Link>
          <p className="text-gray-700">
            View and update your personal profile details.
          </p>
        </div>
      </div>

       */}
    </>
  );
}

export default HomePage;
