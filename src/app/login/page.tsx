// components/Login.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use this for Next.js 13+
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const router = useRouter(); // Initialize the router here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Define showPassword state
  const [showSlide, setShowSlide] = useState(false); // State to handle the slide effect

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Check if the email and password match the given credentials
    if (email === "test@gmail.com" && password === "Test123@") {
      setShowSlide(true); // Trigger the slide effect
      setTimeout(() => {
        router.push(`/`); // Redirect to the home page after 5 seconds
      }, 4000);

    } else {
      alert("Invalid email or password. Please try again."); // Show an error message if credentials don't match
    }
  };
  const handleLoginSubmitAsMember = (e) => {
    e.preventDefault();

    // Check if the email and password match the given credentials
    if (email === "test@gmail.com" && password === "Test123@" && name === "Test") {
      setShowSlide(true); // Trigger the slide effect
      setTimeout(() => {
        router.push(`/`); // Redirect to the home page after 5 seconds
      }, 4000);

    } else {
      alert("Invalid email or password. Please try again."); // Show an error message if credentials don't match
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  // Use useEffect to handle DOM manipulation for sign-in and sign-up buttons
  useEffect(() => {
    // Wait until the DOM is fully loaded before querying elements
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container-form");

    if (sign_in_btn && sign_up_btn && container) {
      sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });

      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });

      // Cleanup the event listeners on component unmount
      return () => {
        sign_up_btn.removeEventListener("click", () => {
          container.classList.add("sign-up-mode");
        });
        sign_in_btn.removeEventListener("click", () => {
          container.classList.remove("sign-up-mode");
        });
      };
    }
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
  {showSlide && (
        <div className="slide-overlay"></div>
      )}
      <div className="container-form">
        <div className="forms-container">
          <div className="signin-signup bg-white bg-opacity-50 rounded-lg shadow-lg backdrop-blur-sm backdrop-filter border border-white border-opacity-85">
            {/* Sign-In Form */}
            <form
              action="#"
              className="sign-in-form form"
              onSubmit={handleLoginSubmit}
            >
              <h2 className="title">Login</h2>
              <div className="input-field-2">
              <Icon icon="ic:baseline-email" width="24" height="24" />
                <input
                  type="email"
                  name="email"
                  id="your_email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field-2">
                <Icon icon="mdi:password" width="24" height="24" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="your_pass"
                  id="your_pass"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-5 top-6 right-3 flex items-center cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-gray-500 font-bold" />
                  ) : (
                    <AiOutlineEye className="text-gray-500" />
                  )}
                </span>
              </div>
              <input type="submit" value="Submit" className="btn solid" />
            </form>

            {/* Sign-Up Form (If you want to toggle between login and signup) */}
            <form action="#" className="sign-up-form form" onSubmit={handleLoginSubmitAsMember}>
              <h2 className="title">Login</h2>
              <div className="input-field-2">
                <Icon icon="mdi:user" width="24" height="24" />
                <input type="text" placeholder="Username"     value={name}
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="input-field-2">
                <Icon icon="ic:baseline-email" width="24" height="24" />
                <input type="email" placeholder="Email"     value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="input-field-2">
                <Icon icon="mdi:password" width="24" height="24" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="your_pass"
                  id="your_pass"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-5 top-6 right-3 flex items-center cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-gray-500 font-bold" />
                  ) : (
                    <AiOutlineEye className="text-gray-500" />
                  )}
                </span>
              </div>
              <input type="submit" className="btn" value="Submit" />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New to our community?</h3>
              <p>
                Discover a world of possibilities! Join us and explore a vibrant
                community where ideas flourish and connections thrive.
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Login as an Agent
              </button>
            </div>
            <img
              src="https://i.ibb.co/6117rMy/Forgot-password-cuate.png"
              className="image mt-10 border-t-2"
              alt=""
            />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of Our Valued Members</h3>
              <p>
                Thank you for being part of our community. Your presence
                enriches our shared experiences. Let's continue this journey
                together!
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Login as a Member
              </button>
            </div>
            <img
              src="https://i.ibb.co/XCMzy6V/Enter-OTP-cuate-1.png"
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
