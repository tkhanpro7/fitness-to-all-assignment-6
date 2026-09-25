import "./globals.css";
import { WorkoutProvider } from "../context/WorkoutContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "FitLog - Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#121212] text-white min-h-screen flex flex-col font-sans">
        <WorkoutProvider>
          <Navbar />
          
          <main className="flex-grow">
             {children}
          </main>
          
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}