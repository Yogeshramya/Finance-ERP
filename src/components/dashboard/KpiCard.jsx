export default function KpiCard({
  title,
  value,
  icon,
  growth,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-gray-900">
            {value}
          </h2>

          <p className="text-green-600 text-sm mt-3 font-medium">
            {growth}
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-3xl shadow-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}