"use client"
import { useState } from 'react';
import settings from "../logo/setting.png"
import Image from "next/image";

export default function FilterButton() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="relative">
      {/* Filter Button */}

      <div className="">
      <button
        onClick={toggleModal}
        className="px-6 py-3 flex justify-center gap-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
      >
             <Image src={settings} alt="download logo" width={30} /> {"  "}
             <span>Fillter </span>
      </button>
      </div>
 

      {/* Popup Modal */}
      {showModal && (
        <div className=" bg-gray-900   bg-white/36 rounded-xl shadow-lg shadow-black/10 backdrop-blur-[7.4px] border border-white/30 fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <h2 className="text-xl font-semibold mb-4 text-center">Filter Options</h2>

            {/* First Section: Maternity */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Maternity</h3>
              
              <div className="flex items-center mb-2">
                <input
                  id="maternity-yes"
                  type="radio"
                  name="maternity"
                  value="Yes"
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="maternity-yes" className="text-gray-700">
          With Maternity
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="maternity-no"
                  type="radio"
                  name="maternity"
                  value="No"
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="maternity-no" className="text-gray-700">
                  Without Maternity
                </label>

                
              </div>
            </div>

            {/* Second Section: Coverage */}
            <div>
              <h3 className="text-lg font-medium mb-2">Coverage</h3>
              <div className="flex items-center mb-2">
                <input
                  id="coverage-below-1-4"
                  type="radio"
                  name="coverage"
                  value="Upto 1.4 Lacks"
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="coverage-below-1-4" className="text-gray-700">
                  Upto 50 Lacks
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="coverage-above-1-5"
                  type="radio"
                  name="coverage"
                  value="Below 1.5 Lacks"
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="coverage-above-1-5" className="text-gray-700">
                  Below 50 Lacks
                </label>
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={toggleModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


