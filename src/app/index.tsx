"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import topIMG from "./img/top.png";
import Intro from "./components/Intro";
import care from "./logo/care.webp";
import adtiya from "./logo/adityabirla.webp";
import bajaj from "./logo/bajajallianz.webp";
import digit from "./logo/digit.webp";
import hdfc from "./logo/hdfcergo.webp";
import icic from "./logo/icicilombard.webp";
import iffco from "./logo/iffcotokio.webp";
import manipal from "./logo/manipalcigna.webp";
import national from "./logo/national.webp";
import newIndia from "./logo/newindia.webp";
import niva from "./logo/nivabupa.webp";
import royal from "./logo/royalsundaram.webp";
import sbi from "./logo/sbigeneral.webp";
import star from "./logo/star.webp";
import tata from "./logo/tataaig.webp";
import unitied from "./logo/unitedindia.webp";
import universal from "./logo/universalsompo.webp";
import cigna from "./logo/cigna.png";
import magma from "./logo/magma.png";
import kotek from "./logo/kotek.png";
import future from "./logo/future.svg";
import chole from "./logo/chole.png";
import reliance from "./logo/reliance.avif";
import liberty from "./logo/liberty.avif";
import ori from "./logo/oriental.webp";
import acko from "./logo/acko.png";
import raheja from "./logo/raheja.png";
import navi from "./logo/navi.png";

// Define the Insurer type
type Insurer = {
  name: string;
  plans: string[];
};
type ApiResponseItem = {
  Company: string;
  Plan: string;
};

export default function Home() {
  const [insurers, setInsurers] = useState<Insurer[]>([]);
  const [selectedInsurer, setSelectedInsurer] = useState<Insurer | null>(null);
  const [selectedPlans, setSelectedPlans] = useState<
    {
      planName: string;
      insurerName: string;
    }[]
  >([]);
  const [submittedCallerName, setSubmittedCallerName] = useState<string | null>(
    null
  ); // New state to store the caller name

  const [isPopupOpen, setIsPopupOpen] = useState(true); // State for popup
  const [formData, setFormData] = useState({
    customerName: "",
    callerName: "",
    customerEmail: "",
    customerContactNumber: "",
  });

  const insurerLogos: { [key: string]: string } = {
    Care: care,
    "Tata AIG": tata,
    SBI: sbi,
    ICICI: icic,
    Cigna: cigna,
    Aditya: adtiya,
    "Niva Bupa": niva,
    "Universal Sompoo": universal,
    HDFC: hdfc,
    "New India": newIndia,
    Star: star,
    "United India": unitied,
    National: national,
    Kotak: kotek,
    Digit: digit,
    Bajaj: bajaj,
    Royal: royal,
    Liberty: liberty,
    Chola: chole,
    Reliance: reliance,
    Navi: navi,
    Raheja: raheja,
    ACKO: acko,
    Magma: magma,
    Oriental: ori,
    "Future Generali": future,
    IFFCO: iffco,
  };

  const baseUrl = "http://localhost:10000";

  // Fetch insurers from the API on component mount
  useEffect(() => {
    const fetchInsurers = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/bima-score`);
        const data: ApiResponseItem[] = await response.json();
        // Transform the raw JSON data
        const formattedData = data.reduce(
          (acc: Insurer[], item: ApiResponseItem) => {
            const insurerIndex = acc.findIndex(
              (insurer) => insurer.name === item.Company
            );
            if (insurerIndex === -1) {
              acc.push({ name: item.Company, plans: [item.Plan] });
            } else {
              if (!acc[insurerIndex].plans.includes(item.Plan)) {
                acc[insurerIndex].plans.push(item.Plan);
              }
            }
            return acc;
          },
          []
        );
        setInsurers(formattedData);
      } catch (error) {
        console.error("Error fetching insurers:", error);
      }
    };
    fetchInsurers();
  }, []);

  // Handle insurer selection
  const handleInsurerSelect = (insurer: Insurer) => {
    setSelectedInsurer(insurer);
  };

  // Handle plan selection
  const handlePlanSelect = (plan: string, insurerName: string) => {
    const isSelected = selectedPlans.some(
      (p) => p.planName === plan && p.insurerName === insurerName
    );
    if (isSelected) {
      setSelectedPlans(
        selectedPlans.filter(
          (p) => !(p.planName === plan && p.insurerName === insurerName)
        )
      );
    } else if (selectedPlans.length < 3) {
      setSelectedPlans([...selectedPlans, { planName: plan, insurerName }]);
    }
  };

  // Generate slug for comparison link
  const generateSlug = (plans: { planName: string; insurerName: string }[]) => {
    return plans
      .map(
        (plan) =>
          `${plan.insurerName.toLowerCase()}-${plan.planName
            .toLowerCase()
            .replace(/\s+/g, "-")}`
      )
      .join("-vs-");
  };
  const slug = generateSlug(selectedPlans);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Perform validation if needed (e.g., check if fields are empty)
    if (
      !formData.customerName ||
      !formData.callerName ||
      !formData.customerEmail ||
      !formData.customerContactNumber
    ) {
      alert("All fields are required!");
      return;
    }

    // Make a POST request to the backend API
    try {
      const response = await fetch("http://localhost:10000/api/add-detail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data inserted successfully:", result);
        alert("Data submitted successfully!");
        setIsPopupOpen(false);
        setSubmittedCallerName(formData.callerName); // Store the caller name after submission
        setFormData({
          customerName: "",
          callerName: "",
          customerEmail: "",
          customerContactNumber: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to submit data");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred while submitting the data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="bg-white fixed inset-0 flex items-center justify-center z-50">
          {/* Bubbles behind the form */}
          <section className="stage absolute top-64 right-[55vw] z-[-10]">
            <figure className="ball-1 bubble filter blur-sm"></figure>
          </section>
          <section className="stage-1 absolute top-[64vh] left-[45vw] z-[-10]">
            <figure className="ball-1 bubble filter blur-sm"></figure>
          </section>
          <section className="stage-1 absolute top-[15vh] left-[40vw] z-[-10]">
            <figure className="ball-1 bubble filter blur-sm"></figure>
          </section>
          <section className="stage absolute top-[55vh] right-[30vw] z-[-10]">
            <figure className="ball-1 bubble filter blur-sm"></figure>
          </section>
          <section className="stage-1 absolute top-[20vh] right-[45vw] z-[-10]">
            <figure className="ball-1 bubble filter blur-sm"></figure>
          </section>
          <section className="stage absolute top-[70vh] left-[30vw] z-[-10]">
            <figure className="ball-1 bubble filter blur-sm"></figure>
          </section>
          <section className="stage absolute top-[10vh] right-[35vw] z-[-10]">
            <figure className="ball-1 bubble filter blur-sm"></figure>
          </section>

          {/* Form */}
          <div className="w-full max-w-md p-6 bg-[rgba(255,243,243,0.39)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5.4px] border border-[rgba(255,243,243,1)] relative z-10 mx-4">
            <div className="text-right">
              <button
                className="text-xl text-right font-bold text-gray-500"
                onClick={() => setIsPopupOpen(false)}
              >
                ✕
              </button>
            </div>

            <h2 className="text-lg font-bold mb-4 text-[#110343] opacity-80">
              Complete the Information
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-[#110343] opacity-70 font-medium mb-2">
                  &#9684; Provide Customer Name
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded font-light text-sm text-gray-900"
                  placeholder="Enter Customer Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#110343] opacity-70 font-medium mb-2">
                  &#9681; Customer Email
                </label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, customerEmail: e.target.value })
                  }
                  required
                  placeholder="Enter Email Address"
                  className="w-full px-3 py-2 border rounded font-light text-sm text-gray-900"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#110343] opacity-70 font-medium mb-2">
                  &#9685; Customer Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.customerContactNumber}
                  placeholder="Enter Contact Number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customerContactNumber: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3 py-2 border rounded font-light text-sm  text-gray-900"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#110343] opacity-70 font-medium mb-2">
                  &#9673; Caller Name
                </label>
                <input
                  type="text"
                  value={formData.callerName}
                  onChange={(e) =>
                    setFormData({ ...formData, callerName: e.target.value })
                  }
                  placeholder="Enter Caller Name"
                  className="w-full px-3 py-2 border rounded font-light text-sm text-gray-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Media Queries for responsiveness */}
          <style jsx>{`
            @media (max-width: 768px) {
              .stage {
                display: none;
              }
            }
          `}</style>
        </div>
      )}
      {/* Main content */}
      <div className=" text-black text-right p-4 z-10  fixed w-full top-0">
        <p className="text-lg font-bold">
          {submittedCallerName
            ? `Hello 👋 ${submittedCallerName}`
            : "Welcome to Health Insurance Compare"}
        </p>
        {/* Add other navbar elements here */}
      </div>
      <div className="text-center bg-gray-100 pt-24">
        <p className="text-gray-500 text-sm">Comparison</p>
        <p className="text-5xl text-black py-5">
          Comparison Health Insurance Policy
        </p>
        <p className="text-lg text-gray-700 pb-11">
          Compare Health Insurance policies from top-rated Insurance Companies
        </p>
      </div>
      {/* Main Content */}
      <div className="flex mb-10 justify-center mx-auto  bg-opacity-24 rounded-2xl  shadow-black/10 backdrop-blur-[9.3px] border border-white/60 shadow-[0px_1px_7px_7px_rgba(0,_0,_0,_0.1)]  w-full max-w-6xl p-8 flex-grow bg-[#f3f4f6]">
        {/* Left panel for insurer selection */}
        <div className="w-1/2 p-4  border-r">
          <h2 className="text-lg font-bold mb-4">&#128073; Select Insurer</h2>
          <div
            className="grid grid-cols-3 gap-4 overflow-y-auto  rounded-lg p-4 bg-white"
            style={{ maxHeight: "520px" }}
          >
            {insurers.map((insurer, index) => (
              <button
                key={index}
                className={`p-3  rounded-lg text-center font-medium ${
                  selectedInsurer?.name === insurer.name
                    ? "bg-blue-100 border-blue-400"
                    : "bg-gray-50"
                } hover:bg-gray-100`}
                onClick={() => handleInsurerSelect(insurer)}
              >
                <div className="">
                  {/* Render logo */}
                  {insurerLogos[insurer.name] && (
                    <div className="w-110">
                      <Image
                        src={insurerLogos[insurer.name]}
                        alt={`${insurer.name} logo`}
                        width={100}
                        className="justify-self-center"
                      />
                    </div>
                  )}
                  {insurer.name}
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Right Panel for Plans */}
      
          {!selectedInsurer ? (
            <div className=" hidden ">
              <Image
                src={topIMG}
                alt="Top Image"
                className="mb-4 w-96 h-64 object-cover"
              />
              <p className="text-gray-500 typewriter-text">
                Select an insurer from the left to view available plans.
              </p>
            </div>
          ) : (
            <>
            <div className="w-1/2  p-4">
              <h2 className="text-lg ml-5 font-bold mb-4">
                &#128073; Selected Insurer <br />
                <span className="text-sm flex leading-10 items-center mb-4 text-gray-700">
                  {" "}
                  {insurerLogos[selectedInsurer.name] && (
                    <Image
                      src={insurerLogos[selectedInsurer.name]}
                      alt={`${selectedInsurer.name} logo`}
                      width={50}
                      height={400}
                      className="mr-2"
                    />
                  )}
                  {selectedInsurer.name} Plans{" "}
                </span>
              </h2>
              <div className="overflow-y-auto max-h-80  rounded p-4">
                {selectedInsurer.plans.map((plan) => (
                  <button
                    key={plan}
                    className={`w-full p-3 mb-2 rounded-lg text-left ${
                      selectedPlans.some(
                        (p) =>
                          p.planName === plan &&
                          p.insurerName === selectedInsurer.name
                      )
                        ? "bg-blue-100 border-blue-400"
                        : "bg-gray-50"
                    } hover:bg-blue-50`}
                    onClick={() => handlePlanSelect(plan, selectedInsurer.name)}
                  >
                    {plan}
                  </button>
                ))}
              </div>
              </div>
            </>
          )}
 
      </div>
      {/* Bottom Section */}
      {selectedPlans.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-50 p-4 shadow-lg">
          <div className="flex justify-between items-center space-x-4">
            <div className=" text-lg font-semibold text-gray-500">
              Compare Plans
            </div>
            {/* Plan Box 1 */}
            {selectedPlans[0] && (
              <div className="relative flex-1 h-14 border rounded-lg bg-white shadow-custom">
                <button
                  className="absolute top-4 right-2 text-red-900"
                  onClick={() =>
                    handlePlanSelect(
                      selectedPlans[0].planName,
                      selectedPlans[0].insurerName
                    )
                  }
                >
                  ✕
                </button>
                <div className="flex justify-center p-6 items-center h-full">
                  {insurerLogos[selectedPlans[0].insurerName] && (
                    <Image
                      src={insurerLogos[selectedPlans[0].insurerName]}
                      alt={`${selectedPlans[0].insurerName} logo`}
                      width={40}
                      height={200}
                      className="mr-2"
                    />
                  )}
                  {selectedPlans[0].insurerName} - {selectedPlans[0].planName}
                </div>
              </div>
            )}
            {/* VS Text if there are at least 2 plans selected */}
            {selectedPlans.length > 1 && (
              <div className="flex items-center justify-center  text-gray-600 text-sm">
                VS
              </div>
            )}
            {/* Plan Box 2 */}
            {selectedPlans[1] && (
              <div className="relative flex-1 h-14 border rounded-lg bg-white shadow-custom">
                <button
                  className="absolute top-4 right-2 text-red-900"
                  onClick={() =>
                    handlePlanSelect(
                      selectedPlans[1].planName,
                      selectedPlans[1].insurerName
                    )
                  }
                >
                  ✕
                </button>
                <div className="flex justify-center items-center p-6 h-full ">
                  {insurerLogos[selectedPlans[1].insurerName] && (
                    <Image
                      src={insurerLogos[selectedPlans[1].insurerName]}
                      alt={`${selectedPlans[1].insurerName} logo`}
                      width={40}
                      height={200}
                      className="mr-2"
                    />
                  )}
                  {selectedPlans[1].insurerName} - {selectedPlans[1].planName}
                </div>
              </div>
            )}
            {/* VS Text if there are at least 3 plans selected */}
            {selectedPlans.length > 2 && (
              <div className="flex items-center justify-center text-gray-600 text-sm">
                VS
              </div>
            )}
            {/* Plan Box 3 */}
            {selectedPlans[2] && (
              <div className="relative flex-1 h-14 border rounded-lg bg-white shadow-custom">
                <button
                  className="absolute top-4 right-2 text-red-900"
                  onClick={() =>
                    handlePlanSelect(
                      selectedPlans[2].planName,
                      selectedPlans[2].insurerName
                    )
                  }
                >
                  ✕
                </button>
                <div className="flex justify-center  p-6 items-center h-full ">
                  {insurerLogos[selectedPlans[2].insurerName] && (
                    <Image
                      src={insurerLogos[selectedPlans[2].insurerName]}
                      alt={`${selectedPlans[2].insurerName} logo`}
                      width={40}
                      height={200}
                      className="mr-2"
                    />
                  )}
                  {selectedPlans[2].insurerName} - {selectedPlans[2].planName}
                </div>
              </div>
            )}
            <div className="flex-1">
              <Link href={`/compare/${slug}`}>
                <button
                  className={`w-full h-14 rounded-lg text-lg font-bold transform hover:scale-110 transition-transform duration-300 ${
                    selectedPlans.length >= 2
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={selectedPlans.length < 2}
                >
                  Compare
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
