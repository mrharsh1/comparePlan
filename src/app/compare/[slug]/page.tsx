"use client"; // Ensure the component is client-side
import { useParams } from "next/navigation"; // Use useParams for dynamic routing in app directory
import { useEffect, useState } from "react";
import InsuranceTable from "../compareTable";

export default function Compare() {
  const { slug } = useParams(); // Get the dynamic slug from the URL
  const [plans, setPlans] = useState<{ insurer: string; plan: string }[]>([]);
  const [plan1, setPlan1] = useState<{ insurer: string; plan: string } | null>(null);
  const [plan2, setPlan2] = useState<{ insurer: string; plan: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      // Ensure slug is treated as a string
      const slugString = Array.isArray(slug) ? slug[0] : slug;

      try {
        // Decode the URL to replace %20 with spaces
        const decodedSlug = decodeURIComponent(slugString);

        const planArray = decodedSlug.split("-vs-");

        if (planArray.length < 2) {
          setError("Invalid slug format. Expected format: 'insurer-plan-vs-insurer-plan'");
          return;
        }

        const formattedPlans = planArray.map((plan) => {
          const [insurer, ...planNameParts] = plan.split("-");
          const planName = planNameParts.join(" "); // Join parts with spaces

          return {
            insurer: insurer.replace(/-/g, " "), // Replace hyphens with spaces in insurer name
            plan: planName.replace(/-/g, " "), // Replace hyphens with spaces in plan name
          };
        });

        setPlan1(formattedPlans[0]);
        setPlan2(formattedPlans[1]);
        setPlans(formattedPlans); // Set both plans
      } catch (err) {
        setError("Failed to process slug. Please check the format.");
      }
    } else {
      setError("Slug is missing in the URL.");
    }
  }, [slug]); // Dependency on slug

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="text-center pt-24">
          <p className="text-gray-500 text-sm text-center">Error</p>
          <p className="text-5xl text-black py-5 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="text-center pt-24">
        <p className="text-gray-500 text-sm text-center">Comparison</p>
        <p className="text-5xl text-black py-5 text-center">Compare Health Insurance</p>
      </div>

      {plans.length > 0 && (
        <div className="text-center py-6 capitalize">
          <h2 className="text-3xl font-bold  text-gray-800">
            {plans.map((plan, idx) => (
              <span key={idx}>
                {plan.insurer} - {plan.plan}
                {idx < plans.length - 1 && " vs "}
              </span>
            ))}
          </h2>
        </div>
      )}

      {/* Pass the plans data to the InsuranceTable component */}
      <InsuranceTable/>
    </div>
  );
}
