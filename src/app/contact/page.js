"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [clicked, setClicked] = useState(false); // Button click state
  const [progress, setProgress] = useState(0); // Progress percentage
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Mouse position
  const router = useRouter();

  // Update mouse position on movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    setClicked(true); // Start transition
    let percentage = 0;

    // Simulate percentage loader and progress animation
    const interval = setInterval(() => {
      percentage += 1;
      setProgress(percentage);

      // Stop progress and navigate once it reaches 100
      if (percentage === 100) {
        clearInterval(interval);
        router.push("/home"); // Navigate to next page after 100%
      }
    }, 32); // This ensures smooth 60fps transition (100% in ~5 seconds)
  };

  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      {/* Mouse-following Glowing Circle */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{
          width: "200px",
          height: "200px",
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          background:
            "radial-gradient(circle, rgba(255,255,0,0.8) 0%, rgba(0,0,0,0) 60%)",
          boxShadow: "0 0 50px 25px rgba(255, 255, 0, 0.5)",
          filter: "blur(30px)",
          zIndex: 9999, // Ensure it stays above all elements
        }}
      />

      {/* Initial Page */}
      <AnimatePresence>
        {!clicked && (
          <motion.div
            key="initialPage"
            className="absolute inset-0 bg-white flex items-center justify-center"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }} // Slide out to the left
            transition={{ duration: 0.8 }}
          >
            {/* Background Text */}
            <h1
              className="absolute  font-black text-[30vw] uppercase tracking-tight leading-none italic"
              style={{
                WebkitTextStroke: "1px black",
                color: "transparent",
              }}
            >
              Please Don’t
            </h1>

            {/* Centered Button */}
            <motion.button
              onClick={handleClick}
              className="px-8 py-3 bg-sky-500 text-white uppercase font-semibold text-xl hover:bg-sky-600 transition relative group z-10"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="relative group-hover:line-through transition-all duration-300">
                Don’t
              </span>{" "}
              Click Here
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliding Page with Percentage Progress */}
      <AnimatePresence>
        {clicked && (
          <motion.div
            key="nextPage"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ x: "100%" }} // Start off-screen to the right
            animate={{ x: 0 }} // Slide in to the center
            exit={{ x: "-100%" }} // Slide out to the left if needed
            transition={{ duration: 0.8 }}
            style={{
              background: "linear-gradient(to right, blue, black)", // Adding a gradient
              color: "white",
            }}
          >
            {/* Slide Content with a Fun Design */}
            <div className="text-center px-6">
              {/* Fun and engaging text */}
              <motion.h2
                className="text-3xl mb-6 font-medium animate__animated animate__fadeIn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Unlock Your Ideal Health Insurance Plan Today!
              </motion.h2>
              <motion.h1
                className="text-6xl font-bold italic text-lime-400 relative group"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Compare & Choose
                {/* <span className="absolute top-0 right-0 text-lg font-normal text-white tracking-widest transform translate-x-5 translate-y-2">
                  Health Insurance
                </span> */}
              </motion.h1>

              {/* Additional fun animation and hover effect */}
              <motion.p
                className="mt-4 text-xl font-light text-gray-200"
                whileHover={{ rotate: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Finding the best coverage just got easier. Compare plans and
                find the right one for you!
              </motion.p>
            </div>

            {/* Progress Loader */}
            <motion.div
              className="absolute bottom-10 right-10 text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {progress}%
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
