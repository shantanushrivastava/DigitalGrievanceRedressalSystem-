import { useEffect, useState } from "react";
import { getAllGrievances, getDashboardStats } from "../../api/adminApi";
import StatsCard from "../../components/admin/StatsCard";
import GrievanceTable from "../../components/admin/GrievanceTable";
import Loader from "../../components/common/Loader";

const STATUS_FILTERS = ["all", "open", "in_progress", "resolved", "closed"];

const AdminDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [gRes, sRes] = await Promise.all([
        getAllGrievances(filter === "all" ? null : filter),
        getDashboardStats(),
      ]);
      setGrievances(gRes.data);
      setStats(sRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and resolve citizen grievances</p>
        </div>

        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatsCard label="Total" value={stats.total} color="text-gray-800" />
            <StatsCard label="Open" value={stats.open} color="text-blue-600" />
            <StatsCard label="In Progress" value={stats.in_progress} color="text-yellow-600" />
            <StatsCard label="Resolved" value={stats.resolved} color="text-green-600" />
          </div>
        )}

        <div className="flex gap-2 mb-5 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`text-xs px-4 py-2 rounded-full font-medium transition capitalize ${
                filter === s ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}>
              {s === "all" ? "All" : s.replace("_", " ")}
            </button>
          ))}
        </div>

        {loading ? <Loader /> : <GrievanceTable grievances={grievances} onUpdate={fetchData} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
