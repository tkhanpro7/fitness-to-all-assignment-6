"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "../context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  return (
    <nav className="flex items-center justify-between px-6 py-4 md:px-12 bg-[#121212] border-b border-gray-800">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-widest text-white">
        {/* আপনি চাইলে এখানে আপনার লোগো আইকন SVG বসাতে পারেন */}
        <span className="text-[#ccff00]">FIT</span>LOG
      </Link>

      {/* Middle: Navigation Links */}
      <div className="hidden gap-2 md:flex sm:gap-6 text-sm font-medium">
        <Link 
          href="/" 
          className={`px-4 py-2 rounded-full transition-colors ${pathname === "/" ? "bg-[#1e1e1e] text-[#ccff00]" : "text-gray-400 hover:text-white"}`}
        >
          Workouts
        </Link>
        <Link 
          href="/my-plan" 
          className={`px-4 py-2 rounded-full transition-colors ${pathname === "/my-plan" ? "bg-[#1e1e1e] text-[#ccff00]" : "text-gray-400 hover:text-white"}`}
        >
          My Plan
        </Link>
      </div>

      {/* Right: Badges */}
      <div className="flex gap-4 text-sm font-medium">
        <Link href="/my-plan" className="flex items-center gap-2 group">
          <span className="text-gray-400 group-hover:text-white transition-colors">Plan</span>
          <span className="bg-[#ccff00] text-black font-bold px-2 py-0.5 rounded-full text-xs">
            {plan.length}
          </span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 group">
          <span className="text-gray-400 group-hover:text-white transition-colors">Saved</span>
          <span className="border border-gray-500 text-white font-bold px-2 py-0.5 rounded-full text-xs group-hover:border-white transition-colors">
            {saved.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}