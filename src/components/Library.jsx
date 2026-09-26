import WorkoutCard from "./WorkoutCard";
import LoadingSpinner from "./LoadingSpinner"; 

export default function Library({ workouts, loading }) {
  return (
    <section id="library" className="px-6 md:px-12 py-16">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-bold text-white uppercase mb-2">The Library</h2>
        <p className="text-gray-400">Twelve lifts covering every major muscle group.</p>
      </div>

      {/* LoadingSpinner component use*/}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}