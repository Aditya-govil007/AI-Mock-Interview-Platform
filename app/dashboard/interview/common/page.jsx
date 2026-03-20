"use client";
import React, { useEffect, useState } from "react";

const Questions = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedCompany, setExpandedCompany] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("/api/company-questions");
      const result = await res.json();
      setData(result);
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  const toggleCompany = (company) => {
    setExpandedCompany(expandedCompany === company ? null : company);
  };

  if (loading) return <div className="p-6 text-center">Loading questions...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Top Company Interview Questions (Last 5 Years)
      </h1>
      {Object.entries(data).map(([company, questions]) => (
        <div key={company} className="mb-8 border-b pb-4">
          <h2
            onClick={() => toggleCompany(company)}
            className="text-xl font-semibold cursor-pointer"
          >
            {company}
          </h2>
          {expandedCompany === company && (
            <div className="mt-4">
              {questions.map((q, index) => (
                <div key={index} className="mb-3 bg-gray-100 p-3 rounded-md">
                  <p className="font-medium">{q.question}</p>
                  <p className="text-sm text-gray-700">
                    Year: {q.year} | Round: {q.round} | Difficulty: {q.difficulty}
                  </p>
                  <p className="text-sm text-gray-500">Tags: {q.tags.join(", ")}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Questions;
