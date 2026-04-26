import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useGrievance } from "../hooks/useGrievance";
import GrievanceCard from "../components/grievance/GrievanceCard";
import Loader from "../components/common/Loader";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { grievances, loading, fetchMyGrievances } = useGrievance();

  useEffect(() => { fetchMyGrievances(); }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Grievances</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name}</p>
          </div>
          <Link to="/submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition">
            + New Grievance
          </Link>
        </div>

        {loading ? <Loader /> : (
          <>
            {grievances.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                <p className="text-4xl mb-4">📋</p>
                <p className="text-gray-500 text-sm">No grievances submitted yet.</p>
                <Link to="/submit" className="inline-block mt-4 text-blue-600 text-sm hover:underline">Submit your first grievance</Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {grievances.map((g) => <GrievanceCard key={g.id} grievance={g} />)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
