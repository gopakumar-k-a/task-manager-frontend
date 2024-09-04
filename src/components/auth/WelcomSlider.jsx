import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const slides = [
  {
    title: "Welcome to Task Manager",
    description:
      "An application designed to help you efficiently manage your tasks. Create, update, and track your tasks all in one place.",
  },
  {
    title: "Real-Time Collaboration",
    description:
      "Work as a team with real-time updates. Any changes made to tasks are instantly reflected for all online users, keeping everyone in sync.",
  },
  {
    title: "Create and Organize Tasks",
    description:
      "Easily add new tasks with titles, descriptions, and due dates. Organize your tasks by priority and status to stay on top of your work.",
  },
  {
    title: "Edit and Update Tasks",
    description:
      "Need to make changes? Edit your tasks to update details or adjust priorities. Keep your task list up-to-date effortlessly.",
  },
  {
    title: "Track Task Progress",
    description:
      "Monitor the progress of your tasks with visual indicators and filters. See how many tasks are completed, in progress, or pending.",
  },
];

const WelcomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 border rounded-lg">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center pb-4"
      >
        <h2 className="text-6xl font-bold mb-4">Task Manager</h2>
      </motion.div>
      <div className="w-full max-w-2xl">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-lg mb-8">{slides[currentSlide].description}</p>
        </motion.div>
        <div className="flex justify-between items-center">
          <GrFormPrevious
            onClick={previousSlide}
            className="h-10 w-10 rounded-full hover:bg-slate-400 bg-white text-black cursor-pointer"
          />
          <MdOutlineNavigateNext
            onClick={nextSlide}
            className="h-10 w-10 rounded-full hover:bg-slate-400 bg-white text-black cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSlider;
