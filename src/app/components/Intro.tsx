// pages/index.js or any page you want
"use client";
import Link from "next/link";

export default function Intro() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center mx-auto py-20">
      <div className="mx-auto w-full px-20">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800">
          How to compare health insurance policies?
        </h1>

        {/* Quick Take Section */}
        <div className="mt-4 text-lg text-gray-700">
          <h3 className="font-semibold">  &#128073; Quick Take:</h3>
          <p>
          You can compare health insurance policies along two verticals.
            First, you compare the insurer – their operational performance,
            claim settlement figures, business scale, and Net Promoter Score.
            Next, you compare the policy itself. You look at the policy
            features, the price point at which they’re selling, and the specific
            use cases they try to address. You take into account every metric
            and then make a qualified choice on what product you want to buy.
          </p>
        </div>
        

        {/* Main Content */}
        <div className="mt-6 text-lg text-gray-700">
          <h3 className="font-semibold"> &#128073; Making the Choice</h3>
          <p>
            Weigh all these factors to determine which policy offers the best
            balance of features, coverage, and affordability. However, comparing
            multiple policies can be time-consuming and overwhelming. Good News!
            Alps Insurance Broker Pvt. Ltd. simplifies this process for you.
            Just share the policies you’re interested in, and we’ll generate a
            detailed comparison chart. You’ll get a side-by-side view of the key
            features, benefits, and limitations, along with our expert
            recommendation on the policy that best suits your needs.
          </p>
        </div>

        {/* Friendly Reminder */}
        <div className="mt-6 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-800">
          <p>
            <span className="font-semibold">
              Need Personalized Advice? <br />
            </span>{" "}
            Instead of navigating this alone, why not let an expert guide you?
            Alps Insurance Broker Pvt. Ltd. offers free consultations with zero
            spam. In just 30 minutes, we’ll address all your doubts and help you
            choose the ideal policy for your requirements.{" "}
            <Link href="/book-call" className="text-blue-600 font-semibold">
              Book a call now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
