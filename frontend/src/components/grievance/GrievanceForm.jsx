import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { submitAnonymous, submitLoggedIn } from "../../api/grievanceApi";
import toast from "react-hot-toast";

const GrievanceForm = ({ onSuccess }) => {
  const { isLoggedIn } = useAuth();
  const [form, setForm] = useState({ title: "", description: "", submitter_name: "", submitter_email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = isLoggedIn
        ? { title: form.title, description: form.description }
        : form;
      const res = isLoggedIn ? await submitLoggedIn(payload) : await submitAnonymous(payload);
      toast.success(`Grievance submitted! Ticket: ${res.data.ticket_id}`);
      onSuccess && onSuccess(res.data);
      setForm({ title: "", description: "", submitter_name: "", submitter_email: "" });
    } catch (err) {
      toast.error(err.response?.data?.detail || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!isLoggedIn && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input name="submitter_name" value={form.submitter_name} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input name="submitter_email" value={form.submitter_email} onChange={handleChange} type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional" />
          </div>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
        <input name="title" value={form.title} onChange={handleChange} required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Brief title of your grievance" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
        <textarea name="description" value={form.description} onChange={handleChange} required rows={5}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Describe your grievance in detail..." />
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition text-sm">
        {loading ? "Submitting..." : "Submit Grievance"}
      </button>
    </form>
  );
};

export default GrievanceForm;
