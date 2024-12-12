"use client"; // Ensure the component is client-side
import { useParams } from "next/navigation"; // Use useParams for dynamic routing in app directory
import { useEffect, useState } from "react";
import InsuranceTable from "../compareTable";

export default function Compare() {
  const { slug } = useParams(); // Get the dynamic slug from the URL
  const [plans, setPlans] = useState<{ insurer: string; plan: string }[]>([]);
  const [plan1, setPlan1] = useState<{ insurer: string; plan: string } | null>(
    null
  );
  const [plan2, setPlan2] = useState<{ insurer: string; plan: string } | null>(
    null
  );
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
          setError(
            "Invalid slug format. Expected format: 'insurer-plan-vs-insurer-plan'"
          );
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
        <p className="text-5xl text-black py-5 text-center">
          Compare Health Insurance
        </p>
      </div>

      {plans.length > 0 && (
        <div className="text-center py-6 capitalize">
          <h2 className="text-3xl font-bold  text-gray-800 px-10">
            {plans.map((plan, idx) => (
              <span key={idx}>
                {plan.insurer} - {plan.plan}
                {idx < plans.length - 1 && " vs "}
              </span>
            ))}
          </h2>
        </div>
      )}

      {/* Decorative Separator */}
{/* Decorative Separator */}
<div className="relative my-10">
  {/* Gradient Line */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-300 h-1"></div>

  {/* Person Icon Moving on the Line */}
  <div className="relative">
    <div className="absolute top-[-50px] left-0 animate-walk">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 text-blue-700"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      {/* Head */}
      <circle cx="12" cy="4" r="2" className="fill-orange-300" />
      {/* Body */}
      <path
        d="M12 6c-.5 0-1 .4-1 1v5c0 .6-.4 1-1 1h-.5v6h3v-3h2v3h3v-6l-2-4h-3V7c0-.6-.4-1-1-1z"
        className="fill-blue-700"
      />
      {/* Left Leg */}
      <path
        d="M11 18c-.5 1-1.5 2-2.5 1"
        className="fill-none stroke-blue-700 stroke-[1.5]"
      >
        <animate
          attributeName="d"
          dur="0.6s"
          repeatCount="indefinite"
          values="
            M11 18c-.5 1-1.5 2-2.5 1; 
            M11 18c-.5 -1-1.5 -2-2.5 -1;
            M11 18c-.5 1-1.5 2-2.5 1"
        />
      </path>
      {/* Right Leg */}
      <path
        d="M13 18c.5 1 1.5 2 2.5 1"
        className="fill-none stroke-blue-700 stroke-[1.5]"
      >
        <animate
          attributeName="d"
          dur="0.6s"
          repeatCount="indefinite"
          values="
            M13 18c.5 1 1.5 2 2.5 1; 
            M13 18c.5 -1 1.5 -2 2.5 -1;
            M13 18c.5 1 1.5 2 2.5 1"
        />
      </path>
    </svg>
    </div>
  </div>

  {/* Text in the Center */}
  <div className="relative text-center">
    <span className="bg-gray-100 px-3 text-lg text-gray-500">
      Let’s dive into the details
    </span>
  </div>
</div>

      {/* Dynamic Introduction Section */}
      {/* <div className="text-left px-24">
        <h2 className="text-3xl font-bold text-gray-1000">Introduction</h2>
        <p className="text-lg leading-relaxed text-gray-800 py-6">
          Before we start comparing these policies, we have to set out some
          ground rules.
        </p>
        {plans.length >= 2 && (
          <p className="text-lg leading-relaxed text-gray-800 py-2">
            {plans.map((plan, idx) => (
              <span key={idx}>
                <b className="capitalize">{plan.plan}</b> is sold by{" "}
                <b className="capitalize">{plan.insurer}</b>
                {idx < plans.length - 1 &&
                  (idx === plans.length - 2 ? " and " : ", ")}{" "}
              </span>
            ))}
            . So any meaningful comparison should include a comparison of the
            products alongside the insurers themselves.
          </p>
        )}
        {plans.length >= 3 && (
          <p className="text-lg leading-relaxed text-gray-800 py-2">
            Comparing three policies adds complexity. While{" "}
            <b className="capitalize">{plans[0].plan}</b> and{" "}
            <b className="capitalize">{plans[1].plan}</b> may cater to specific
            groups, <b className="capitalize">{plans[2].plan}</b> might offer
            broader coverage or a distinct set of features.
          </p>
        )}
        <p className="text-lg leading-relaxed text-gray-800 py-2">
          Second, we know that these products have massive differences in their
          core structure.{" "}
          {plans.map((plan, idx) => (
            <span key={idx}>
              <b className="capitalize">{plan.plan}</b>
              {idx < plans.length - 1 &&
                (idx === plans.length - 2 ? " and " : ", ")}{" "}
            </span>
          ))}
          are designed to cater to different needs. You must evaluate which plan
          aligns best with your requirements.
        </p>
        <p className="text-lg leading-relaxed text-gray-800 py-2">
          And finally, any comparison is ultimately futile without considering
          the use case. Who are you buying this policy for? Yourself, your
          family, or your parents?
        </p>
        <p className="text-lg leading-relaxed text-gray-800 py-2">
          That’s something you’ll need to answer before using this guide. So
          with that introduction out of the way, we can get to comparing the
          actual policies themselves.
        </p>
      </div> */}

      {/* Pass the plans data to the InsuranceTable component */}
      <InsuranceTable />
    </div>
  );
}
