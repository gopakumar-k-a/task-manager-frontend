import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
const slides = [
  {
    title: "Welcome to imageDrive",
    description:
      "An application that allows you to manage your images with ease. Login, Register, and start uploading!",
  },
  {
    title: "Register and Login",
    description:
      "Create an account using your Email ID and Phone number, and secure it with a password. Forgot your password? No worries, reset it anytime!",
  },
  {
    title: "Add and Manage Images",
    description:
      "Easily add images with titles, view your uploads, and manage them all in one place. Edit or delete your images with just a click.",
  },
  {
    title: "Rearrange Images",
    description:
      "Drag and drop to rearrange your images. Save the order that best suits your needs.",
  },
  {
    title: "Edit and Delete",
    description:
      "Need to update an image or its title? Edit it! Want to remove it? Delete it with ease.",
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
    setInterval(() => {
      nextSlide();
    }, 5000);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 border rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="flex  justify-center items-center pb-4"
        >
          <h2 className="text-6xl font-bold mb-4 ">Image Drive</h2>
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
              className=" h-10 w-10 rounded-full hover:bg-slate-400 bg-white text-black "
            />
            <MdOutlineNavigateNext
              onClick={nextSlide}
              className=" h-10 w-10 rounded-full hover:bg-slate-400 bg-white text-black "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeSlider;
