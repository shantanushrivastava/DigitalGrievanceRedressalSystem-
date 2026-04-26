const StatsCard = ({ label, value, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className={`text-3xl font-bold ${color || "text-gray-800"}`}>{value}</p>
  </div>
);

export default StatsCard;
