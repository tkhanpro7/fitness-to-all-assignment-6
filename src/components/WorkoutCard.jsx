import Image from "next/image";
import Link from "next/link";

export default function WorkoutCard({ workout }) {
  // API থেকে আসা category ডাটা হ্যান্ডেল করার জন্য সেফটি চেক
  // এটি স্ট্রিং বা অ্যারে যাই হোক না কেন, ঠিকমতো রেন্ডার করবে
  const categories = Array.isArray(workout.category) 
    ? workout.category 
    : workout.category 
      ? [workout.category] 
      : [];

  return (
    <Link href={`/workout/${workout.id}`} className="block group">
      <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#ccff00] transition-colors h-full flex flex-col pb-4">
        
        {/* Image Section - Error Fixed Here */}
        <div className="relative aspect-video bg-gray-800 mb-4">
          <Image 
            src={workout.image || "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740"} 
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col grow">
          {/* Missing Category Badges Fix */}
          {categories.length > 0 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {categories.map((cat, idx) => (
                <span key={idx} className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-1 rounded uppercase">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title & Equipment */}
          <h3 className="text-lg font-bold text-white uppercase mb-1">{workout.name}</h3>
          <p className="text-gray-400 text-sm mb-4 grow">{workout.equipment}</p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 text-xs text-gray-400 font-medium border-t border-gray-700 pt-3">
            <span className="flex items-center gap-1">
              ⏱️ {workout.duration || 0} min
            </span>
            <span className="flex items-center gap-1">
              🔥 {workout.calories || 0} kcal
            </span>
            <span className="flex items-center gap-1">
              ⭐ {workout.rating || "0.0"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}