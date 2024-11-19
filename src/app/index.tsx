"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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
    { planName: string; insurerName: string }[]
  >([]);

  // Fetch insurers from the API on component mount
  useEffect(() => {
    const fetchInsurers = async () => {
      try {
        const response = await fetch("http://localhost:10000/api/bima-score");
        const data: ApiResponseItem[] = await response.json(); // Define type for response data
  
        // Transform the raw JSON data
        const formattedData = data.reduce((acc: Insurer[], item: ApiResponseItem) => {
          const insurerIndex = acc.findIndex((insurer) => insurer.name === item.Company);
          if (insurerIndex === -1) {
            acc.push({ name: item.Company, plans: [item.Plan] });
          } else {
            if (!acc[insurerIndex].plans.includes(item.Plan)) {
              acc[insurerIndex].plans.push(item.Plan);
            }
          }
          return acc;
        }, []);
  
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="text-center bg-gray-100 pt-24">
        <p className="text-gray-500 text-sm text-center">Comparison</p>
        <p className="text-5xl text-black py-5 text-center">
          Comparison Health Insurance Policy
        </p>
        <p className="text-lg text-gray-700 pb-11 text-center">
          Compare Health Insurance policies from top-rated Insurance Company
        </p>
      </div>
      <div className="flex justify-center mx-auto bg-white rounded-lg shadow-lg w-full max-w-6xl p-8">
        {/* Left panel for insurer selection */}
        <div className="w-1/2 p-4 border-r">
          <h2 className="text-lg font-bold mb-4">Select Insurer</h2>
          <div className="grid grid-cols-3 gap-4">
            {insurers.map((insurer) => (
              <button
                key={insurer.name}
                className={`p-3 border rounded-lg text-center font-medium ${
                  selectedInsurer?.name === insurer.name
                    ? "bg-blue-100 border-blue-400"
                    : "bg-gray-50"
                } hover:bg-gray-100`}
                onClick={() => handleInsurerSelect(insurer)}
              >
                {insurer.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right panel to show selected insurer's plans */}
        <div className="w-1/2 p-4">
          {selectedInsurer && (
            <>
              <h2 className="text-lg font-bold mb-4">
                {selectedInsurer.name} Plans
              </h2>
              <div className="grid grid-cols-1 gap-2 mb-6">
                {selectedInsurer.plans.length > 0 ? (
                  selectedInsurer.plans.map((plan) => (
                    <button
                      key={plan}
                      className={`p-3 border rounded-lg text-left ${
                        selectedPlans.some(
                          (p) =>
                            p.planName === plan &&
                            p.insurerName === selectedInsurer.name
                        )
                          ? "bg-blue-100 border-blue-400"
                          : "bg-gray-50"
                      } hover:bg-blue-50`}
                      onClick={() =>
                        handlePlanSelect(plan, selectedInsurer.name)
                      }
                    >
                      {plan}
                    </button>
                  ))
                ) : (
                  <p>No plans available for this insurer</p>
                )}
              </div>
            </>
          )}

          {/* Display selected plans */}
          {selectedPlans.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold mb-2">Selected Plans:</h3>
              <div className="space-y-2">
                {selectedPlans.map((plan, idx) => (
                  <div
                    key={idx}
                    className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
                  >
                    <span>
                      {plan.insurerName} - {plan.planName}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        handlePlanSelect(plan.planName, plan.insurerName)
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compare Button */}
          {selectedPlans.length >= 2 && (
            <div className="mt-6 flex justify-end">
              <Link href={`/compare/${slug}`}>
                <button className="py-2 px-10 rounded-lg bg-blue-500 text-white">
                  Compare
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
