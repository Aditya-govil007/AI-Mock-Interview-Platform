// app/dashboard/upgrade/page.jsx
import React from "react";

const features = [
  {
    title: "AI-Powered Mock Interviews",
    description: "Unlimited AI-generated mock interviews tailored to your job role.",
  },
  {
    title: "Performance Insights",
    description: "Track your improvement and focus on weak areas with smart analytics.",
  },
  {
    title: "Company-Specific Questions",
    description: "Access curated questions from top tech companies over the last 5 years.",
  },
  {
    title: "Downloadable PDFs",
    description: "Export your questions and answers for offline practice.",
  },
  {
    title: "Voice Interview Mode",
    description: "Practice speaking your answers aloud and get tone feedback.",
  },
];

export default function UpgradePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Upgrade to Pro </h1>
      <p className="text-lg text-gray-600 mb-10">
        Unlock powerful features designed to boost your interview success.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feat, index) => (
          <div key={index} className="border rounded-lg p-6 shadow-sm bg-white hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{feat.title}</h2>
            <p className="text-gray-700 mt-2">{feat.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <button className="px-6 py-3 bg-primary text-white font-bold rounded hover:bg-primary/90">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
