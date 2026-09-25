import Image from 'next/image';
import React from 'react';

const Hero2 = () => {
    return (
        <section className="bg-[#1a1a1a] md:mx-12 mt-6 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-16 border border-gray-800" >
            {/* left side component */}
            <div>
                <p>WORKOUT LIBRARY</p>
                <h2>Train with intent. Log every set.</h2>
                <p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.</p>
                <button>BROWSE WORKOUTS ↓</button>
            </div>
            <div>
                <Image src="/Images/banner.png" alt="Hero Workout" width={400} height={500} />
            </div>
        </section> 
    );
};

export default Hero2;