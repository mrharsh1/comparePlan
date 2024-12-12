import Link from "next/link";
import React from "react";
import guide from "../img/tour-guide.png";
import price from "../img/best-price.png";
import sale from "../img/clerk.png";
import Image from "next/image";

const InsurancePlanSection = () => {
  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Let's Compare Your Health Insurance Plan
        </h2>
      </div>
      <div className="my-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Guided Experience */}
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-blue-100 rounded-full">
            {/* Icon */}
            <Image src={guide} alt="No Pushy Sales Agents Icon" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {" "}
            Guided Support
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Our experts are here to simplify your insurance needs and guide you
            every step of the way.
          </p>
        </div>

        {/* No pushy sales agents */}
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-green-100 rounded-full">
            {/* Icon */}
            <Image src={sale} alt="No Pushy Sales Agents Icon" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {" "}
            No Pressure, Just Advice
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Say goodbye to aggressive sales tactics. We provide unbiased advice
            to help you choose what’s best for you.
          </p>
        </div>

        {/* Best Price Guaranteed */}
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center bg-yellow-100 rounded-full">
            {/* Icon */}
            <Image src={price} alt="No Pushy Sales Agents Icon" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {" "}
            Unbeatable Online Prices
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Get the best rates available online, with complete transparency and
            zero hidden fees.
          </p>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="mt-10 text-center">
        <Link
          href="/getDetails"
          className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700"
        >
          Get Started →
        </Link>
        <p className="mt-4 text-sm text-gray-500">
        Need help? We're always here to assist. <br /> Just click the 'Help' button in the top-right corner to reach out to us.
        </p>
      </div>
    </div>
  );
};

export default InsurancePlanSection;
