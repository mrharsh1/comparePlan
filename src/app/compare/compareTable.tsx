"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import download from "../logo/arrow.png"
import Image from "next/image";
declare module "jspdf" {
  interface jsPDF {
    autoTable: any;
  }
}
import jsPDF from "jspdf";
import "jspdf-autotable"; // Required for auto table support in jsPDF
import FilterButton from "../components/filter";
import DownloadPdfButton from "./genratePDF";
type InsuranceData = {
  parameter: string;
  plan1: string | number;
  plan2: string | number;
  plan3?: string | number; // Optional for dynamic handling
};
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://compareplan-1.onrender.com"
    : "http://localhost:10000";
// Define Props Interface
type InsuranceTableProps = {
  slug?: string; // Optional, fetched from useParams if not passed directly
};
const InsuranceTable: React.FC<InsuranceTableProps> = ({ slug }) => {
  const { slug: paramSlug } = useParams();
  const [insuranceData, setInsuranceData] = useState<InsuranceData[]>([]);
  const [plans, setPlans] = useState<{ insurer: string; plan: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const resolvedSlug = slug || paramSlug; // Use prop slug if provided, else fallback to URL param
  // Parameters categorized into three sections
  const mostImportantFeatures = [
    "ROOM RENT",
    "MATERNITY",
    "POST-HOSPITALIZATION",
    "PRE HOSPITALIZATION",
    "AMBULANCE COVER",
    "RESTORE BENEFIT",
    "MENTAL ILLNESS",
    "TPA",
    "AIR AMBULANCE",
  ];
  const additionalFeatures = [
    "GLOBAL COVER",
    "ANNUAL PREVENTIVE HEALTH CHECK-UP COVER",
    "AYUSH BENEFIT",
    "OUT-PATIENT TREATMENT (OPD)",
    "MODERN TREATMENT",
    "BARIATRIC SURGERY",
    "TELECONSULTATIONS/E CONSULTATIONS",
    "SECOND OPINION/ E OPINION",
    "CONSUMABLES",
  ];
  const leastImportantFeatures = [
    "ORGAN DONOR",
    "CO-PAYMENT FOR SENIOR AGE",
    "CO PAYMENT OUT OF NETWORK",
    "CO-PAYMENT FOR TREATMENT IN A HIGHER ZONE",
    "NEW BORN BABY COVER",
    "CUMULATIVE BONUS",
  ];
  useEffect(() => {
    if (resolvedSlug) {
      // Ensure resolvedSlug is a string
      const slugAsString = Array.isArray(resolvedSlug)
        ? resolvedSlug[0]
        : resolvedSlug;
      const decodedSlug = decodeURIComponent(slugAsString);
      const planArray = decodedSlug.split("-vs-");
      if (planArray.length < 2 || planArray.length > 3) {
        setError(
          "Invalid slug format. Expected format: 'insurer-plan-vs-insurer-plan' or 3 plans for comparison."
        );
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
      setPlans(formattedPlans);
      fetchData(formattedPlans);
    } else {
      setError("Slug is missing in the URL.");
      setLoading(false);
    }
  }, [resolvedSlug]);
  const fetchData = async (plans: { insurer: string; plan: string }[]) => {
    const requiredFeatures = [
      ...mostImportantFeatures,
      ...additionalFeatures,
      ...leastImportantFeatures,
    ];
    try {
      const response = await fetch(`${baseUrl}/api/bima-score`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      const filteredData: InsuranceData[] = [];
      const featureSet = new Set();
      data.forEach((item: any) => {
        const featureName = item.STANDARD_FEATURE_NAME;
        if (!requiredFeatures.includes(featureName)) return;
        const remark = item.Conditions_Remark || "";
        const company = item.Company?.toLowerCase().trim();
        const plan = item.Plan?.toLowerCase().trim();
        const formattedValue = remark || "N/A";
        if (!featureSet.has(featureName)) {
          filteredData.push({
            parameter: featureName,
            plan1: "N/A",
            plan2: "N/A",
            plan3: plans.length === 3 ? "N/A" : undefined,
          });
          featureSet.add(featureName);
        }
        const row = filteredData.find((r) => r.parameter === featureName);
        if (row) {
          if (
            plans[0]?.insurer.toLowerCase() === company &&
            plans[0]?.plan.toLowerCase() === plan
          ) {
            row.plan1 = formattedValue;
          }
          if (
            plans[1]?.insurer.toLowerCase() === company &&
            plans[1]?.plan.toLowerCase() === plan
          ) {
            row.plan2 = formattedValue;
          }
          if (
            plans[2] &&
            plans[2]?.insurer.toLowerCase() === company &&
            plans[2]?.plan.toLowerCase() === plan
          ) {
            row.plan3 = formattedValue;
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
  const generateTableData = () => {
    const combinedData = [
      { category: "Most Important Points", data: mostImportantData },
      { category: "Additional Points", data: additionalData },
      { category: "Least Important Points", data: leastImportantData },
    ];
    const headers = [
      "Parameter",
      ...plans.map((plan) => `${plan.insurer} - ${plan.plan}`),
    ];
    const body = combinedData.flatMap(({ category, data }) => [
      [
        {
          content: category,
          colSpan: plans.length + 1,
          styles: { fillColor: [200, 230, 255] },
        },
      ],
      ...data.map((row) => [
        { content: row.parameter, styles: { fillColor: [255, 255, 255] } },
        ...plans.map((_, index) => ({
          content: row[`plan${index + 1}` as keyof InsuranceData] || "",
          styles: {
            fillColor: index % 2 === 0 ? [240, 240, 240] : [255, 255, 255],
          },
        })),
      ]),
    ]);
    return { headers, body };
  };
  const mostImportantData = insuranceData.filter((item) =>
    mostImportantFeatures.includes(item.parameter)
  );
  const additionalData = insuranceData.filter((item) =>
    additionalFeatures.includes(item.parameter)
  );
  const leastImportantData = insuranceData.filter((item) =>
    leastImportantFeatures.includes(item.parameter)
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="container mx-auto my-10 p-4">
      <div className="flex gap-6 mb-6">
        <DownloadPdfButton />
      </div>
      {/* Rest of the table rendering */}
      <div className="overflow-x-auto shadow-lg rounded-3xl">
        <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <th className="p-6 text-left font-bold capitalize border border-gray-200">
                Parameter
              </th>
              {plans.map((plan, index) => (
                <th
                  key={index}
                  className="p-6 text-left font-bold uppercase border border-gray-200"
                >
                  {plan.insurer} - {plan.plan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Most Important Points */}
            <tr className="bg-gray-100">
              <td
                colSpan={plans.length + 1}
                className="p-4 font-bold text-left bg-sky-200"
              >
                Most Important Points
              </td>
            </tr>
            {mostImportantData.map((row, index) => (
              <tr key={index}>
                <td className="p-4 border border-gray-200 bg-white">
                  {row.parameter}
                </td>
                <td
                  className={`p-4 border border-gray-200 ${["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                    row.plan1
                  )
                      ? "bg-red-100"
                      : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                >
                  {["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                    row.plan1
                  )
                    ? "❌"
                    : row.plan1}
                </td>
                <td
                  className={`p-4 border border-gray-200 ${["Not Covered", "No", "No Co-Payment", "N/A", ""].includes(
                    row.plan2
                  )
                      ? "bg-red-100"
                      : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                >
                  {["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                    row.plan2
                  )
                    ? "❌"
                    : row.plan2}
                </td>
                {plans.length === 3 && (
                  <td
                    className={`p-4 border border-gray-200 ${[
                        "Not Covered",
                        "No",
                        "N/A",
                        "No Co-Payment",
                        "",
                      ].includes(row.plan3)
                        ? "bg-red-100"
                        : index % 2 === 0
                          ? "bg-gray-100"
                          : "bg-white"
                      }`}
                  >
                    {["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                      row.plan3
                    )
                      ? "❌"
                      : row.plan3}
                  </td>
                )}
              </tr>
            ))}
            {/* Additional Points */}
            <tr className="bg-gray-100">
              <td
                colSpan={plans.length + 1}
                className="p-4 font-bold text-left bg-sky-200"
              >
                Additional Points
              </td>
            </tr>
            {additionalData.map((row, index) => (
              <tr key={index}>
                <td className="p-4 border border-gray-200 bg-white">
                  {row.parameter}
                </td>
                <td
                  className={`p-4 border border-gray-200 ${["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                    row.plan1
                  )
                      ? "bg-red-100"
                      : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                >
                  {["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                    row.plan1
                  )
                    ? "❌"
                    : row.plan1}
                </td>
                <td
                  className={`p-4 border border-gray-200 ${["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                    row.plan2
                  )
                      ? "bg-red-100"
                      : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                >
                  {["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                    row.plan2
                  )
                    ? "❌"
                    : row.plan2}
                </td>
                {plans.length === 3 && (
                  <td
                    className={`p-4 border border-gray-200 ${[
                        "Not Covered",
                        "No",
                        "N/A",
                        "No Co-Payment",
                        "",
                      ].includes(row.plan3)
                        ? "bg-red-100"
                        : index % 2 === 0
                          ? "bg-gray-100"
                          : "bg-white"
                      }`}
                  >
                    {["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                      row.plan3
                    )
                      ? "❌"
                      : row.plan3}
                  </td>
                )}
              </tr>
            ))}

            {/* Least Important Points */}
            <tr className="bg-gray-100">
              <td
                colSpan={plans.length + 1}
                className="p-4 font-bold text-left bg-sky-200"
              >
                Least Important Points
              </td>
            </tr>
            {leastImportantData.map((row, index) => (
              <tr key={index}>
                <td className="p-4 border border-gray-200 bg-white">
                  {row.parameter}
                </td>
                <td
                  className={`p-4 border border-gray-200 ${["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                    row.plan1
                  )
                      ? "bg-red-100"
                      : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                >
                  {["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                    row.plan1
                  )
                    ? "❌"
                    : row.plan1}
                </td>
                <td
                  className={`p-4 border border-gray-200 ${["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                    row.plan2
                  )
                      ? "bg-red-100"
                      : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                >
                  {["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                    row.plan2
                  )
                    ? "❌"
                    : row.plan2}
                </td>
                {plans.length === 3 && (
                  <td
                    className={`p-4 border border-gray-200 ${[
                        "Not Covered",
                        "No",
                        "N/A",
                        "No Co-Payment",
                        "",
                      ].includes(row.plan3)
                        ? "bg-red-100"
                        : index % 2 === 0
                          ? "bg-gray-100"
                          : "bg-white"
                      }`}
                  >
                    {["Not Covered", "No", "N/A", "No Co-Payment", ""].includes(
                      row.plan3
                    )
                      ? "❌"
                      : row.plan3}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default InsuranceTable;