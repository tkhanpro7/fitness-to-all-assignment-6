"use client";

import { createContext, useState, useEffect, useContext } from "react";

// Context তৈরি করা হলো
const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
    const [plan, setPlan] = useState([]);
    const [saved, setSaved] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // পেজ লোড হলে Local Storage থেকে আগের সেভ করা ডেটা নিয়ে আসা
    useEffect(() => {
        // Wrap the state updates in a timeout to run asynchronously.
        // This prevents the "synchronous cascading render" linting error 
        // while perfectly preserving Next.js hydration safety.
        const timer = setTimeout(() => {
            const storedPlan = JSON.parse(localStorage.getItem("fitlog_plan")) || [];
            const storedSaved = JSON.parse(localStorage.getItem("fitlog_saved")) || [];
            setPlan(storedPlan);
            setSaved(storedSaved);
            setIsLoaded(true);
        }, 0);

        // Cleanup function
        return () => clearTimeout(timer);
    }, []);

    // Plan বা Saved ডেটা পরিবর্তন হলে তা সাথে সাথে Local Storage-এ সেভ করা
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("fitlog_plan", JSON.stringify(plan));
            localStorage.setItem("fitlog_saved", JSON.stringify(saved));
        }
    }, [plan, saved, isLoaded]);

    // Today's Plan-এ ওয়ার্কআউট যোগ করার ফাংশন
    const addToPlan = (workout) => {
        if (plan.length >= 5) {
            alert("You can only add up to 5 workouts for today!"); // ক্যাপ লিমিট
            return;
        }
        // ওয়ার্কআউট আগে থেকে না থাকলে যোগ করবে
        if (!plan.find((item) => item.id === workout.id)) {
            setPlan([...plan, workout]);
        }
    };

    // Saved-এ ওয়ার্কআউট যোগ করার ফাংশন
    const saveForLater = (workout) => {
        if (!saved.find((item) => item.id === workout.id)) {
            setSaved([...saved, workout]);
        }
    };

    return (
        <WorkoutContext.Provider value={{ plan, saved, addToPlan, saveForLater, setPlan, setSaved }}>
            {children}
        </WorkoutContext.Provider>
    );
}

// অন্য পেজ থেকে সহজে ব্যবহার করার জন্য কাস্টম হুক
export function useWorkout() {
    return useContext(WorkoutContext);
}