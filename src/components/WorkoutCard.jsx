import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="block group">
      <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#ccff00] transition-colors h-full flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-video bg-gray-800">
          <img 
            src={workout.image || "https://via.placeholder.com/400x300"} 
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Tags */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {workout.category?.map((cat, idx) => (
              <span key={idx} className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-1 rounded uppercase">
                {cat}
              </span>
            ))}
          </div>

          {/* Title & Equipment */}
          <h3 className="text-lg font-bold text-white uppercase mb-1">{workout.name}</h3>
          <p className="text-gray-400 text-sm mb-4 flex-grow">{workout.equipment}</p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 text-xs text-gray-400 font-medium border-t border-gray-700 pt-3">
            <span className="flex items-center gap-1">
              ⏱️ {workout.duration} min
            </span>
            <span className="flex items-center gap-1">
              🔥 {workout.calories} kcal
            </span>
            <span className="flex items-center gap-1">
              ⭐ {workout.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}