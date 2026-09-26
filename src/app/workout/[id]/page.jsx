"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation"; // notFound ইম্পোর্ট করা হলো
import { useWorkout } from "@/context/WorkoutContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import Toast from "@/components/Toast";

export default function WorkoutDetails() {
  const params = useParams();
  const { addToPlan, saveForLater } = useWorkout();
  
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastData, setToastData] = useState({ isVisible: false, message: "" });

  useEffect(() => {
    const fetchWorkoutDetail = async () => {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${params.id}`);
        
        // API যদি 404 বা অন্য কোনো এরর স্ট্যাটাস দেয়
        if (!res.ok) {
          setWorkout(null);
          return;
        }

        const data = await res.json();
        
        // ডাটা যদি ফাঁকা হয় বা আসল অবজেক্ট না হয় (যেমন id বা name না থাকে)
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
    addToPlan(workout);
    showToast("Added to today's plan! 📋");
  };

  const handleSaveForLater = () => {
    saveForLater(workout);
    showToast("Saved for later! 🔖");
  };

  // 1. ডেটা লোড হওয়ার সময় স্পিনার দেখাবে
  if (loading) return <LoadingSpinner />;
  
  // 2. লোডিং শেষ কিন্তু ডেটা পাওয়া যায়নি, তখন সরাসরি 404 পেজে রিডাইরেক্ট করবে
  if (!loading && !workout) {
    notFound(); 
  }

  // 3. সঠিক ডেটা পেলে টেমপ্লেট রেন্ডার করবে
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        <div className="bg-[#1e1e1e] rounded-3xl overflow-hidden border border-gray-800 sticky top-24">
          <img 
            src={workout.image || "https://via.placeholder.com/600x800"} 
            alt={workout.name}
            className="w-full h-auto object-cover aspect-[4/5]"
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