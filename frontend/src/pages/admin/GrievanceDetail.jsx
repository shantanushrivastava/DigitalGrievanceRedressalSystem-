// Reserved for future: detailed single grievance view for admin
// Currently all actions are handled inline in GrievanceTable
import { Link } from "react-router-dom";

const GrievanceDetail = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <p className="text-gray-500 mb-4">Detailed view coming soon.</p>
      <Link to="/admin" className="text-blue-600 hover:underline text-sm">Back to Dashboard</Link>
    </div>
  </div>
);

export default GrievanceDetail;
