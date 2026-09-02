export default function StatsSection() {
  const stats = [
    { value: "0.36 Million", label: "SQ. FT. of\nTotal Area" },
    { value: "02 Buildings", label: "Total\nBuildings" },
    { value: "Pune,\nMaharashtra", label: "Park\nLocation" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-gray-100 p-6 rounded-lg w-full">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-4 ${
              index < stats.length - 1 ? "border-b border-gray-300" : ""
            }`}
          >
            <div className="text-xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm font-bold text-red-600 text-right whitespace-pre-line">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
