"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import Toast from "@/components/Toast";

export default function WorkoutDetails() {
  const params = useParams(); // URL থেকে ID নেওয়ার জন্য
  const { addToPlan, saveForLater } = useWorkout(); // Context থেকে ফাংশন আনছি
  
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastData, setToastData] = useState({ isVisible: false, message: "" });

  // API থেকে নির্দিষ্ট ওয়ার্কআউটের ডেটা ফেচ করা
  useEffect(() => {
    const fetchWorkoutDetail = async () => {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${params.id}`);
        const data = await res.json();
        setWorkout(data);
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchWorkoutDetail();
  }, [params.id]);

  // Toast দেখানোর ফাংশন
  const showToast = (message) => {
    setToastData({ isVisible: true, message });
    setTimeout(() => {
      setToastData({ isVisible: false, message: "" });
    }, 3000); // ৩ সেকেন্ড পর হাইড হবে
  };

  const handleAddToPlan = () => {
    addToPlan(workout);
    showToast("Added to today's plan! 📋");
  };

  const handleSaveForLater = () => {
    saveForLater(workout);
    showToast("Saved for later! 🔖");
  };

  if (loading) return <LoadingSpinner />;
  if (!workout) return <div className="text-center py-20 text-xl">Workout not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Image/Visual */}
        <div className="bg-[#1e1e1e] rounded-3xl overflow-hidden border border-gray-800 sticky top-24">
          <img 
            src={workout.image || "https://via.placeholder.com/600x800"} 
            alt={workout.name}
            className="w-full h-auto object-cover aspect-[4/5]"
          />
        </div>

        {/* Right Side: Details */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">{workout.name}</h1>
          <p className="text-gray-400 text-lg mb-6">{workout.description}</p>

          {/* Tags */}
          <div className="flex gap-3 mb-8">
            {workout.category?.map((cat, idx) => (
              <span key={idx} className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase">
                {cat}
              </span>
            ))}
          </div>

          {/* Key Specs Table */}
          <div className="bg-[#1e1e1e] border border-gray-800 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div className="text-gray-500 uppercase tracking-wider">Equipment</div>
              <div className="text-right font-medium">{workout.equipment}</div>
              
              <div className="text-gray-500 uppercase tracking-wider">Difficulty</div>
              <div className="text-right font-medium">{workout.difficulty || "Intermediate"}</div>
              
              <div className="text-gray-500 uppercase tracking-wider">Sets</div>
              <div className="text-right font-medium">{workout.sets || "4"}</div>
              
              <div className="text-gray-500 uppercase tracking-wider">Reps</div>
              <div className="text-right font-medium">{workout.reps || "6-8"}</div>
              
              <div className="text-gray-500 uppercase tracking-wider">Duration</div>
              <div className="text-right font-medium">{workout.duration} min</div>
              
              <div className="text-gray-500 uppercase tracking-wider">Calories</div>
              <div className="text-right font-medium">{workout.calories} kcal</div>
              
              <div className="text-gray-500 uppercase tracking-wider">Rating</div>
              <div className="text-right font-medium">{workout.rating} ⭐</div>
            </div>
          </div>

          {/* Instructions */}
          {workout.instructions && (
            <div className="mb-10">
              <h3 className="text-xl font-bold uppercase mb-4">Instructions</h3>
              <ol className="space-y-4 text-gray-300 list-decimal list-inside marker:text-[#ccff00] marker:font-bold">
                {workout.instructions.map((step, idx) => (
                  <li key={idx} className="leading-relaxed pl-2">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToPlan}
              className="flex-1 bg-[#ccff00] text-black font-bold py-4 px-6 rounded-xl hover:bg-[#b3e600] transition-colors flex justify-center items-center gap-2"
            >
              📋 Add to today's plan
            </button>
            <button 
              onClick={handleSaveForLater}
              className="flex-1 bg-transparent border border-gray-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
            >
              🔖 Save for later
            </button>
          </div>
        </div>
      </div>

      {/* Toast Component */}
      <Toast message={toastData.message} isVisible={toastData.isVisible} />
    </div>
  );
}