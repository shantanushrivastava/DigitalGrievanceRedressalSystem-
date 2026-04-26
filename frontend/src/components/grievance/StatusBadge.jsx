import { STATUS_COLORS, STATUS_LABELS, PRIORITY_COLORS } from "../../utils/constants";

export const StatusBadge = ({ status }) => (
  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[status] || "bg-gray-100 text-gray-600"}`}>
    {STATUS_LABELS[status] || status}
  </span>
);

export const PriorityBadge = ({ priority }) => (
  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${PRIORITY_COLORS[priority] || "bg-gray-100 text-gray-600"}`}>
    {priority}
  </span>
);
