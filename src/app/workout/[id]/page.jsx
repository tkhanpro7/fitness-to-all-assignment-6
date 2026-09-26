"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import Toast from "@/components/Toast";
import Image from "next/image";

export default function WorkoutDetails() {
  const params = useParams();
  
  // Context plan and saved checking
  const { plan, saved, addToPlan, saveForLater } = useWorkout();
  
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastData, setToastData] = useState({ isVisible: false, message: "" });

  useEffect(() => {
    const fetchWorkoutDetail = async () => {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${params.id}`);
        
        if (!res.ok) {
          setWorkout(null);
          return;
        }

        const data = await res.json();
        
        if (!data || Object.keys(data).length === 0 || !data.name) {
          setWorkout(null);
        } else {
          setWorkout(data);
        }
      } catch (error) {
        console.error("Error fetching detail:", error);
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchWorkoutDetail();
  }, [params.id]);

  const showToast = (message) => {
    setToastData({ isVisible: true, message });
    setTimeout(() => {
      setToastData({ isVisible: false, message: "" });
    }, 3000);
  };

  const handleAddToPlan = () => {
    // check if the workout is already in the plan
    const isAlreadyAdded = plan.some((item) => item.id === workout.id);
    if (isAlreadyAdded) {
      showToast("⚠️ You already added this workout!");
      return; // further not executed
    }

    // ২. 5 workouts limit check
    if (plan.length >= 5) {
      showToast("🚫 Limit reached! You can only add 5 workouts.");
      return;
    }

    // new workout add
    addToPlan(workout);
    showToast("Added to today's plan! 📋");
  };

  const handleSaveForLater = () => {
    // checking if the workout is already saved for later
    const isAlreadySaved = saved.some((item) => item.id === workout.id);
    if (isAlreadySaved) {
      showToast("⚠️ Already saved for later!");
      return;
    }

    //New workout save
    saveForLater(workout);
    showToast("Saved for later! 🔖");
  };

  if (loading) return <LoadingSpinner />;
  
  if (!loading && !workout) {
    notFound(); 
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        <div className="bg-[#1e1e1e] rounded-3xl overflow-hidden border border-gray-800 sticky top-24">
          <Image 
            src={workout.image} 
            alt={workout.name}
            width={600}
            height={800}
            className="w-full h-auto object-cover aspect-4/5"
          />
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">{workout.name}</h1>
          <p className="text-gray-400 text-lg mb-6">{workout.description}</p>

          <div className="flex gap-3 mb-8">
            {workout.category?.map((cat, idx) => (
              <span key={idx} className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase">
                {cat}
              </span>
            ))}
          </div>

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

      <Toast message={toastData.message} isVisible={toastData.isVisible} />
    </div>
  );
}