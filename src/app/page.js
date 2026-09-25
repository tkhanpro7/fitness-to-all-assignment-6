"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Library from "@/components/Library"; // Library ইম্পোর্ট করা হলো

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  // API থেকে ডেটা ফেচ করা
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Component */}
      <Hero />

      {/* Library Component (Props হিসেবে ডেটা পাঠানো হলো) */}
      <Library workouts={workouts} loading={loading} />
    </div>
  );
}