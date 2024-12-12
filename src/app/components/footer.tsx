import React from "react";
import Link from "next/link";
import logo from "../img/logo.png";
import Image from "next/image";
import insta from "../img/instagram.png"
import fb from "../img/facebook.png"
import linkedin from "../img/linkedin.png"
import yt from "../img/youtube.png"


const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 border-t shadow-2xl">
      <div className="container mx-auto px-10">
   
        <div className="flex justify-between items-center pb-6">
          <div className="text-xl  text-blue-600">
            <Image src={logo} alt="logo" width={200} height={200} />
          </div>
    

          <div className="flex space-x-6 justify-between">
            <Link href="/" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-500">
              About Us
            </Link>
            <Link href="/blogs" className="text-gray-700 hover:text-blue-500">
              Blogs
            </Link>
            <Link href="/checker" className="text-gray-700 hover:text-blue-500">
              Contact
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between border-b border-gray-300 pb-6">

          <div className="flex space-x-4 items-center">
            <Link
              href="https://www.instagram.com"
              className="text-gray-600 hover:text-blue-500"
            >
               <Image src={insta} alt="insta" width={40} height={40} />
            </Link>
            <Link
              href="https://in.linkedin.com/company/youralpsinsurance"
              className="text-gray-600 hover:text-blue-500"
            >
                <Image src={linkedin} alt="insta" width={30} height={30} />
            </Link>
            <Link
              href="https://www.facebook.com"
              className="text-gray-600 hover:text-blue-500"
            >
                 <Image src={fb} alt="insta" width={30} height={30} />
            </Link>
            <Link
              href="https://www.youtube.com/@youralpsinsurance"
              className="text-gray-600 hover:text-blue-500"
            >
             <Image src={yt} alt="yt" width={30} height={30} />
            </Link>
            <Link href="/" className="text-gray-600 hover:text-blue-500">
              <i className="fas fa-times"></i>
            </Link>
          </div>
        </div>

        {/* Additional Links */}
        <div className="py-6 text-sm text-gray-600">
          <p>
            People also search for:
            <Link href="/term-insurance-costly" className="hover:text-blue-500">
              {" "}
              Is term Health Insurance costly{" "}
            </Link>{" "}
            |
            <Link href="/insurance-nri" className="hover:text-blue-500">
              {" "}
              Health insurance for NRI{" "}
            </Link>{" "}
            |
            <Link
              href="/term-insurance-housewife"
              className="hover:text-blue-500"
            >
              {" "}
              Health Insurance for housewife{" "}
            </Link>{" "}
            |{/* Add more search links here... */}
          </p>
        </div>

        {/* Disclaimer and Company Information */}
        <div className="py-6 border-t border-gray-300 text-sm text-gray-600">
          <p>
            Disclaimer: Alps Insurance Brokers Pvt Ltd <br />
            License category: Direct Broker (Life & General) <br />
            CIN: U66220DL2023PTC411530, COI: IRDAI/DB1062/2023, IRDAI Registration: 943 <br />
            Registered Office: 1st Floor , 1 E/5 Jhandewalan Extension, New Delhi - 110055  <br />
           
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-between items-center pt-4">
          <p className="text-gray-600 text-sm">
            © 2024 Alps Insurance Brokers PVT. LTD. All rights reserved.
          </p>
          <div className="space-x-4">
            <Link
              href="/privacy-policy"
              className="text-gray-700 hover:text-blue-500"
            >
              Privacy policy{" "}
            </Link>
            <Link
              href="/terms-conditions"
              className="text-gray-700 hover:text-blue-500"
            >
              Healths & conditions
            </Link>
          </div>
        </div>
      </div>
     
    </footer>
  );
};

export default Footer;
