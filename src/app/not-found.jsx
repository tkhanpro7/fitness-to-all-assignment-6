import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center flex-grow bg-[#121212]">
      <h1 className="text-8xl font-bold text-[#ccff00] mb-4">404</h1>
      <h2 className="text-3xl font-bold text-white uppercase mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        The workout or page you are looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link 
        href="/" 
        className="bg-[#ccff00] text-black font-bold px-8 py-3 rounded-full hover:bg-[#b3e600] transition-colors inline-block"
      >
        RETURN HOME
      </Link>
    </div>
  );
}