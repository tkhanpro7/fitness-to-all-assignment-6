import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-6 py-8 md:px-12 bg-[#121212] border-t border-gray-800 text-sm text-gray-500 mt-auto">
      <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-white mb-4 md:mb-0">
        <span className="text-[#ccff00]">FIT</span>LOG
      </Link>
      <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}