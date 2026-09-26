"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";
import Toast from "@/components/Toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";

export default function MyPlan() {
    const { plan, setPlan, saved, setSaved } = useWorkout();

    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("plan"); // 'plan' or 'saved'
    const [sortBy, setSortBy] = useState("duration"); // Challenge C1
    const [toastData, setToastData] = useState({ isVisible: false, message: "" });

    // Hydration Fix
    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const showToast = (message) => {
        setToastData({ isVisible: true, message });
        setTimeout(() => setToastData({ isVisible: false, message: "" }), 3000);
    };

    const handleRemove = (id) => {
        if (activeTab === "plan") {
            setPlan(plan.filter((w) => w.id !== id));
        } else {
            setSaved(saved.filter((w) => w.id !== id));
        }
        showToast("❌ Workout removed.");
    };

    const handleMarkAsDone = (id) => {
        if (activeTab === "plan") {
            setPlan(plan.filter((w) => w.id !== id));
        } else {
            setSaved(saved.filter((w) => w.id !== id));
        }
        showToast("✅ Workout marked as done!");
    };

    if (!mounted) return <LoadingSpinner />;

  
    const totalExercises = plan.length;
    const totalMinutes = plan.reduce((acc, curr) => acc + Number(curr.duration || 0), 0);
    const totalCalories = plan.reduce((acc, curr) => acc + Number(curr.calories || 0), 0);

    // Active Tab 
    const currentData = activeTab === "plan" ? plan : saved;
    const sortedData = [...currentData].sort((a, b) => {
        if (sortBy === "duration") return b.duration - a.duration; // Highest first
        if (sortBy === "calories") return b.calories - a.calories;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
    });

    return (
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 grow w-full">
            
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold uppercase mb-2">My Plan</h1>
                <p className="text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#1e1e1e] border border-gray-800 rounded-3xl p-8 mb-10">
                <div>
                    <div className="text-gray-400 text-sm mb-1">Exercises</div>
                    <div className="text-5xl font-bold text-[#ccff00]">{totalExercises}</div>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-gray-700 pt-4 md:pt-0 md:pl-8">
                    <div className="text-gray-400 text-sm mb-1">Minutes</div>
                    <div className="text-5xl font-bold text-white">{totalMinutes}</div>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-gray-700 pt-4 md:pt-0 md:pl-8">
                    <div className="text-gray-400 text-sm mb-1">Calories</div>
                    <div className="text-5xl font-bold text-white">{totalCalories}</div>
                </div>
            </div>

            {/* Tabs & Sort Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 border-b border-gray-800 pb-4">
                <div className="flex gap-2 bg-[#1e1e1e] p-1 rounded-xl w-full sm:w-auto">
                    <button
                        onClick={() => setActiveTab("plan")}
                        className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === "plan" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}`}
                    >
                        Today's Plan
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === "saved" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}`}
                    >
                        Saved
                    </button>
                </div>
                
                <div className="flex items-center gap-3 text-sm w-full sm:w-auto justify-end">
                    <span className="text-gray-500">Sort By</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-transparent border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-[#ccff00] cursor-pointer"
                    >
                        <option value="duration" className="bg-[#121212]">Duration</option>
                        <option value="calories" className="bg-[#121212]">Calories</option>
                        <option value="rating" className="bg-[#121212]">Rating</option>
                    </select>
                </div>
            </div>

            {/* List / Empty State */}
            {sortedData.length === 0 ? (
                <div className="border border-dashed border-gray-700 rounded-3xl p-16 text-center flex flex-col items-center justify-center bg-[#161616]">
                    <h3 className="text-2xl font-bold uppercase mb-2">Nothing here yet</h3>
                    <p className="text-gray-400 mb-6">Browse the library and add a lift to get today moving.</p>
                    <Link href="/" className="bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full hover:bg-[#b3e600] transition-colors">
                        Go to workouts
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedData.map((workout) => (
                        <div key={workout.id} className="bg-[#1e1e1e] border border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-6 hover:border-gray-600 transition-colors">

                            {/* Thumbnail */}
                            <div className="w-full sm:w-24 h-24 shrink-0 bg-gray-800 rounded-xl overflow-hidden">
                                <Image
                                    src={workout.image || "https://via.placeholder.com/150"}
                                    alt={workout.name}
                                    width={150}
                                    height={150}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            
                            {/* Info */}
                            <div className="grow text-center sm:text-left w-full">
                                <h3 className="text-lg font-bold text-white uppercase mb-1">{workout.name}</h3>
                                <p className="text-gray-400 text-sm mb-3">{workout.equipment}</p>
                                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-gray-400 font-medium">
                                    <span>⏱️ {workout.duration} min</span>
                                    <span>🔥 {workout.calories} kcal</span>
                                    <span>⭐ {workout.rating}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                                <Link
                                    href={`/workout/${workout.id}`}
                                    className="text-sm font-bold text-gray-300 hover:text-white px-4 py-2 border border-gray-700 rounded-lg transition-colors"
                                >
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleMarkAsDone(workout.id)}
                                    title="Mark as Done"
                                    className="p-2 text-gray-400 hover:text-[#ccff00] hover:bg-gray-800 rounded-lg transition-all"
                                >
                                    ✅
                                </button>
                                <button
                                    onClick={() => handleRemove(workout.id)}
                                    title="Remove"
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg transition-all"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Toast Notification */}
            <Toast message={toastData.message} isVisible={toastData.isVisible} />
        </div>
    );
}