import { useState } from "react";
import { updateGrievanceStatus } from "../../api/adminApi";
import { StatusBadge, PriorityBadge } from "../grievance/StatusBadge";
import { formatDate } from "../../utils/helpers";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["open", "in_progress", "resolved", "closed"];

const GrievanceTable = ({ grievances, onUpdate }) => {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ status: "", admin_remarks: "" });

  const openEdit = (g) => {
    setEditing(editing === g.id ? null : g.id);
    setForm({ status: g.status, admin_remarks: g.admin_remarks || "" });
  };

  const handleSave = async (id) => {
    try {
      await updateGrievanceStatus(id, form);
      toast.success("Status updated");
      setEditing(null);
      onUpdate && onUpdate();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {["Ticket ID", "Title", "Category", "Priority", "Status", "Date", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {grievances.map((g) => (
            <>
              {/* Main Row */}
              <tr key={g.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-mono text-xs text-blue-600">{g.ticket_id}</td>
                <td className="px-4 py-3 max-w-xs truncate text-gray-800">{g.title}</td>
                <td className="px-4 py-3 text-gray-600">{g.category}</td>
                <td className="px-4 py-3"><PriorityBadge priority={g.priority} /></td>
                <td className="px-4 py-3"><StatusBadge status={g.status} /></td>
                <td className="px-4 py-3 text-gray-400">{formatDate(g.created_at)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => openEdit(g)}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition">
                    {editing === g.id ? "Close" : "Update"}
                  </button>
                </td>
              </tr>

              {/* Expanded Row — description + update form */}
              {editing === g.id && (
                <tr key={`${g.id}-detail`} className="bg-blue-50">
                  <td colSpan={7} className="px-6 py-4">
                    {/* Description */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Description</p>
                      <p className="text-sm text-gray-700 bg-white border border-gray-200 rounded-lg px-4 py-3">
                        {g.description || "No description provided"}
                      </p>
                    </div>

                    {/* Update Form */}
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Status</p>
                        <select value={form.status}
                          onChange={(e) => setForm({ ...form, status: e.target.value })}
                          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Admin Remarks</p>
                        <input
                          type="text"
                          placeholder="Add remarks..."
                          value={form.admin_remarks}
                          onChange={(e) => setForm({ ...form, admin_remarks: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex gap-2 mt-4 sm:mt-0 self-end">
                        <button onClick={() => handleSave(g.id)}
                          className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition">Save</button>
                        <button onClick={() => setEditing(null)}
                          className="text-sm bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg hover:bg-gray-200 transition">Cancel</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
          {grievances.length === 0 && (
            <tr><td colSpan={7} className="text-center py-10 text-gray-400">No grievances found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GrievanceTable;