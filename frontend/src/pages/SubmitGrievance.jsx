import { useState } from "react";
import GrievanceForm from "../components/grievance/GrievanceForm";

const SubmitGrievance = () => {
  const [submitted, setSubmitted] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Submit a Grievance</h1>
          <p className="text-gray-500 text-sm mt-1">
            You can submit anonymously or <a href="/login" className="text-blue-600 hover:underline">login</a> to track easily.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border border-green-200 rounded-2xl p-8 shadow-sm text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Grievance Submitted!</h2>
            <p className="text-gray-500 text-sm mb-5">Save your ticket ID to track status</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
              <p className="text-xs text-blue-600 font-medium mb-1">Your Ticket ID</p>
              <p className="text-2xl font-mono font-bold text-blue-700">{submitted.ticket_id}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
              <button onClick={() => setSubmitted(null)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition">
                Submit Another
              </button>
              <a href={`/track`}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition">
                Track Ticket
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <GrievanceForm onSuccess={setSubmitted} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitGrievance;