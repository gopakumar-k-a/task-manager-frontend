import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-600">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>

            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 10px rgb(0, 0, 0)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                transition: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1,
                  ease: "easeInOut",
                },
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
              onClick={() => navigate("/")}
              className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
            >
              Back to homepage
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
