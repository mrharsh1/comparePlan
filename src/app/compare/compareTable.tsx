"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type InsuranceData = {
  parameter: string;
  plan1: string | number;
  plan2: string | number;
};

const InsuranceTable: React.FC = () => {
  const { slug } = useParams();
  const [insuranceData, setInsuranceData] = useState<InsuranceData[]>([]);
  const [plan1, setPlan1] = useState<{ insurer: string; plan: string } | null>(null);
  const [plan2, setPlan2] = useState<{ insurer: string; plan: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const planArray = slug.split("-vs-");
      if (planArray.length !== 2) {
        setError("Invalid slug format. Expected format: 'insurer-plan-vs-insurer-plan'");
        setLoading(false);
        return;
      }

      const formattedPlans = planArray.map((plan) => {
        const [insurer, ...planNameParts] = plan.split("-");
        const planName = planNameParts.join(" ");
        return {
          insurer: insurer.replace(/-/g, " "),
          plan: planName.replace(/-/g, " "),
        };
      });

      setPlan1(formattedPlans[0]);
      setPlan2(formattedPlans[1]);

      fetchData(formattedPlans);
    } else {
      setError("Slug is missing in the URL.");
      setLoading(false);
    }
  }, [slug]);

  const fetchData = async (plans: { insurer: string; plan: string }[]) => {
    try {
      const response = await fetch("http://localhost:5000/api/bima-score");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      // Ensure data.data is defined and is an array
      if (!data || !Array.isArray(data.data)) {
        throw new Error("API response is not in the expected format.");
      }

      const filteredData: InsuranceData[] = [];
      const featureSet = new Set();

      // Process each feature in the API response
      data.data.forEach((item: any) => {
        const featureName = item.STANDARD_FEATURE_NAME;
        const status = item.Status || "";
        const remark = item.Conditions_Remark || "";
        const company = item.Company?.toLowerCase().trim();
        const plan = item.Plan?.toLowerCase().trim();

        // Concatenate status and remark
        const formattedValue = status && remark ? `${status} and ${remark}` : status || remark || "N/A";

        // Only add new feature if it's not already added
        if (!featureSet.has(featureName)) {
          filteredData.push({
            parameter: featureName,
            plan1: "N/A",
            plan2: "N/A",
          });
          featureSet.add(featureName);
        }

        const row = filteredData.find((r) => r.parameter === featureName);

        if (row) {
          // Match plan 1
          if (
            plans[0]?.insurer.toLowerCase() === company &&
            plans[0]?.plan.toLowerCase() === plan
          ) {
            row.plan1 = formattedValue;
          }

          // Match plan 2
          if (
            plans[1]?.insurer.toLowerCase() === company &&
            plans[1]?.plan.toLowerCase() === plan
          ) {
            row.plan2 = formattedValue;
          }
        }
      });

      setInsuranceData(filteredData);
    } catch (err) {
      console.error("Error fetching data from API:", err);
      setError("Failed to load data from the API.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="text-center pt-24">
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="text-center pt-24">
          <p className="text-gray-500 text-sm">Error</p>
          <p className="text-5xl text-black py-5">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-4">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <th className="p-6 text-left border border-gray-200 rounded-tl-lg">COMPARE INSURANCES</th>
              <th className="p-6 text-left border border-gray-200">
                {plan1?.insurer} - {plan1?.plan}
              </th>
              <th className="p-6 text-left border border-gray-200">
                {plan2?.insurer} - {plan2?.plan}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {insuranceData.map((row, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}`}>
                <td className="p-4 border border-gray-200">{row.parameter}</td>
                <td className="p-4 border border-gray-200">
                  {row.plan1 !== "N/A" ? row.plan1 : ""}
                </td>
                <td className="p-4 border border-gray-200">
                  {row.plan2 !== "N/A" ? row.plan2 : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsuranceTable;
