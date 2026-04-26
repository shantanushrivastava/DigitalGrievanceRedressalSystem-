import { formatDate } from "../../utils/helpers";
import { StatusBadge, PriorityBadge } from "./StatusBadge";

const GrievanceCard = ({ grievance }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
    <div className="flex items-start justify-between gap-3 mb-3">
      <h3 className="font-semibold text-gray-800 text-base leading-snug">{grievance.title}</h3>
      <StatusBadge status={grievance.status} />
    </div>
    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{grievance.description}</p>
    <div className="flex flex-wrap gap-2 mb-3">
      <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{grievance.category}</span>
      <PriorityBadge priority={grievance.priority} />
    </div>
    <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
      <span>Ticket: <span className="font-mono font-medium text-gray-600">{grievance.ticket_id}</span></span>
      <span>{formatDate(grievance.created_at)}</span>
    </div>
    {grievance.admin_remarks && (
      <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
        <span className="font-medium">Remarks: </span>{grievance.admin_remarks}
      </div>
    )}
  </div>
);

export default GrievanceCard;
