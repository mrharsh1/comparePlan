"use client";
import Link from "next/link";
import { useState } from "react";
import GlassEffectGrid from "../components/GlassEffectGrid";
import RegistrationForm from "../components/form";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    smoker: false,
    diabetes: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Handle previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Handle form submit (on final step)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Submit logic here
  };

  return (
    <div className="min-h-screen mt-12 bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-6 mt-10">
          <span
            className={`w-1/3 h-1 rounded-lg ${
              step >= 1 ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></span>
          <span
            className={`w-1/3 h-1 rounded-lg ${
              step >= 2 ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></span>
          <span
            className={`w-1/3 h-1 rounded-lg ${
              step >= 3 ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></span>
        </div>
      </div>

      <div className="p-12 w-full">
        {step === 1 && (
          <div className="flex">
            <div className="w-full md:w-1/2 p-12 border-r-4">

              <div>
                <div
                  className=" absolute inset-0 bg-cover bg-center opacity-40 " //animate-move-slow
                  style={{
                    backgroundImage: `url('https://i.ibb.co/6FSRR38/formBack.png')`, // Replace this with your background image URL
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "600px",
                    height: "600px",
                    top: "11rem",
                    left: "11rem",
                  }}
                ></div>

                <div
                  className=" absolute inset-0 bg-cover bg-center opacity-30 " // animate-move-fast
                  style={{
                    backgroundImage: `url('https://i.ibb.co/6FSRR38/formBack.png')`, // Replace this with your background image URL
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "600px",
                    height: "600px",
                    top: "11rem",
                    left: "11rem",
                  }}
                ></div>

                <div
                  className=" absolute inset-0 bg-cover bg-center opacity-20 " //animate-move-medium
                  style={{
                    backgroundImage: `url('https://i.ibb.co/6FSRR38/formBack.png')`, // Replace this with your background image URL
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "600px",
                    height: "600px",
                    top: "11rem",
                    left: "11rem",
                  }}
                ></div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 bg-[rgba(255,255,255,0.2)] backdrop-blur-sm border border-[rgba(255,255,255,0.25)] rounded-lg shadow-lg p-6"
                >
                  <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                    Tell us about you
                  </h2>
                  {/* First Name and Last Name */}
                  <div className="flex space-x-4">
                    <div className="w-full">
                      <label className="block text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Full Name"
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile and Email */}
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="block text-gray-700">Mobile</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Mobile Number"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>

                  {/* Next Button */}
                  <div>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-12">
              {/* <GlassEffectGrid /> */}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full md:w-1/2 p-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Tell us about Caller
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name and Last Name */}
              <div className="flex space-x-4">
                <div className="w-full">
                  <label className="block text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>

              {/* Mobile and Email */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    placeholder="Mobile Number"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>

              {/* Next Button */}
              <div>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="w-full p-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Review and Submit
            </h2>
            <div className="space-y-6">
              <div>
                <p>
                  <strong>Full Name:</strong> {formData.fullName}
                </p>
                <p>
                  <strong>Mobile:</strong> {formData.mobile}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Smoker:</strong>{" "}
                  {formData.smoker === "yes" ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Diabetes:</strong>{" "}
                  {formData.diabetes === "yes" ? "Yes" : "No"}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Back
                </button>
                {/* <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                > */}
                <Link
                  href="/"
                  className="w-full text-center
                     bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Submit
                </Link>

                {/* </button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
