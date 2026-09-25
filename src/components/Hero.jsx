import Image from "next/image";

export default function Hero() {
    return (
        <section className="bg-[#1a1a1a] mx-4 md:mx-12 mt-6 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-16 border border-gray-800">
            <div className="flex-1 text-center md:text-left z-10">
                <p className="text-[#ccff00] font-bold tracking-widest text-sm mb-4">WORKOUT LIBRARY</p>
                <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6 leading-tight">
                    Train with intent. Log<br /> every set.
                </h1>
                <p className="text-gray-400 mb-8 max-w-md mx-auto md:mx-0">
                    FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
                </p>
                <a
                    href="#library"
                    className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full hover:bg-[#b3e600] transition-colors"
                >
                    BROWSE WORKOUTS ↓
                </a>
            </div>

            {/* Hero Image (Right Side) */}
            <div className="flex-1 mt-8 md:mt-0 flex justify-center">
                
                <Image
                    src="/Images/banner.png"
                    alt="Hero Workout"
                    width={400}
                    height={500}
                    className="max-h-100 object-contain"
                />
            </div>
        </section>
    );
}