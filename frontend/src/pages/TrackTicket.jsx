import { useState } from "react";
import { trackTicket } from "../api/grievanceApi";
import { StatusBadge } from "../components/grievance/StatusBadge";
import { formatDate } from "../utils/helpers";
import toast from "react-hot-toast";

const TrackTicket = () => {
  const [ticketId, setTicketId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await trackTicket(ticketId.trim());
      setResult(res.data);
    } catch (err) {
      toast.error("Ticket not found. Please check the ID.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Track Your Ticket</h1>
          <p className="text-gray-500 text-sm mt-1">Enter your ticket ID to check current status</p>
        </div>

        <form onSubmit={handleTrack} className="flex gap-3 mb-8">
          <input
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="e.g. GH-20250101-ABC123"
            required
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-3 rounded-xl text-sm font-medium transition">
            {loading ? "..." : "Track"}
          </button>
        </form>

        {result && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">{result.ticket_id}</p>
                <h2 className="text-lg font-semibold text-gray-800">{result.title}</h2>
              </div>
              <StatusBadge status={result.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-500">
              <div><span className="font-medium text-gray-700">Submitted:</span> {formatDate(result.created_at)}</div>
              <div><span className="font-medium text-gray-700">Updated:</span> {formatDate(result.updated_at)}</div>
            </div>

            {result.admin_remarks && (
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                <p className="font-medium text-gray-700 mb-1">Admin Remarks</p>
                <p>{result.admin_remarks}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackTicket;