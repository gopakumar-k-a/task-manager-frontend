import React, { useState, useEffect } from "react";
import { RiSunFill } from "react-icons/ri";
import { BsFillMoonStarsFill } from "react-icons/bs";

function ClockCard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  const isNight = time.getHours() >= 18 || time.getHours() < 6;
  return (
    <div className="w-72 h-36 bg-gradient-to-r from-[#141E30] to-[#243B55] rounded-lg  flex flex-col justify-center relative text-white cursor-pointer transition-all duration-300 ease-in-out  overflow-hidden">
      <p className="text-4xl ml-4 font-semibold font-sans">
        {formatTime(time).split(" ")[0]}
        <span className="text-lg ml-1">{formatTime(time).split(" ")[1]}</span>
      </p>
      <p className="text-lg ml-4 mt-1 font-medium font-sans">
        {formatDate(time)}
      </p>
      {isNight ? (
        <BsFillMoonStarsFill className="text-white h-5 w-5 absolute right-4 top-4 transition-all duration-300 ease-in-out hover:text-lg" />
      ) : (
        <RiSunFill className="text-white h-5 w-5 absolute right-4 top-4 transition-all duration-300 ease-in-out hover:text-lg" />
      )}
    </div>
  );
}

export default ClockCard;
