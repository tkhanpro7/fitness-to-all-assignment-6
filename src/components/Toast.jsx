export default function Toast({ message, isVisible}){
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-8 right-8 bg-[#ccff00] text-black px-6 py-3 rounded-xl font-bold shadow-2xl z-50 animate-fade-in-up border border-[#b3e600] ">
            {message}
        </div>
    );
}