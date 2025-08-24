"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, MapPin } from "lucide-react";
import { Orbitron } from "next/font/google";
import { motion } from "framer-motion";
import About from "../components/About";
import FAQ from "../components/FAQ";
import TeamPage from "../components/Teams";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "900"],
});

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPlaybackRate(10), 500),
      setTimeout(() => setPlaybackRate(16), 1000),
      setTimeout(() => setLoading(false), 1500),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  const teamSections = [
    {
      title: "Local Leads",
      members: [
        { name: "Nihal Yadav", role: "Lead - Northern", image: "/team/praveen.jpg" },
        { name: "Mayank Aggrawal", role: "Lead - Eastern", image: "/team/kaustubh.jpg" },
      ],
    },
    {
      title: "Media Team & PR",
      members: [
        { name: "Shailendra Yadav", role: "Content & Social Media", image: "/team/carol.jpg" },
        { name: "Moksh Mishra", role: "Video & Photography", image: "/team/dave.jpg" },
      ],
    },
    {
      title: "Graphics Team",
      members: [
        { name: "Ujjwal Patel", role: "Lead Designer", image: "/team/utkarsh.jpg" },
        { name: "Vaanya Jain", role: "Motion Designer", image: "/team/yash.jpg" },
      ],
    },
    {
      title: "Technical Team",
      members: [
        { name: "Sayman Lal", role: "Frontend Dev", image: "/team/alice.jpg" },
        { name: "Aadeesh Jain", role: "Backend Dev", image: "/team/bob.jpg" },
      ],
    },
  ];

  // Framer Motion variants for smooth "coming in front" effect
  const frontVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <main className="relative w-full flex flex-col overflow-x-hidden bg-black">
      {/* LOADER */}
      {loading && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black">
          <video
            autoPlay
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            ref={(vid) => {
              if (vid) vid.playbackRate = playbackRate;
            }}
          >
            <source src="/loader.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />

        {/* NAVBAR */}
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] w-[90vw] sm:w-[500px]">
          <div className="flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
              <span className="text-white font-semibold hidden sm:block">NASA</span>
            </div>
            <button className="text-white md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <div className="hidden md:flex space-x-6 text-white font-medium">
              <a href="https://www.spaceappschallenge.org/2025/challenges/" className="hover:text-blue-300">Challenges</a>
              <a href="/partners" className="hover:text-blue-300">Partners</a>
              <a href="#teams" className="hover:text-blue-300">Contact</a>
            </div>
          </div>
          {isOpen && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80vw] sm:w-[400px] bg-white/10 backdrop-blur-lg text-white flex flex-col items-center space-y-4 py-6 rounded-xl border border-white/20 shadow-lg md:hidden z-30">
              <a href="https://www.spaceappschallenge.org/2025/challenges/" onClick={() => setIsOpen(false)}>Challenges</a>
              <a href="/partners" onClick={() => setIsOpen(false)}>Partners</a>
              <a href="#teams" onClick={() => setIsOpen(false)}>Contact</a>
            </div>
          )}
        </nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
          <h1 className={`stroke-heading text-4xl md:text-7xl font-extrabold leading-tight tracking-wide ${orbitron.className}`}>
            NASA Space Apps Challenge
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-200">
            <MapPin size={28} className="text-red-400 drop-shadow" />
            <h2 className="text-2xl md:text-4xl font-semibold drop-shadow text-white">Jabalpur, India 2025</h2>
          </div>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl">
            Powered by <span className="font-bold text-white">Unstop</span>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#faq"
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition shadow-lg flex items-center gap-2"
            >
              FAQ&apos;s
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#about" className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg">
              Register Now
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={frontVariant}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full bg-black text-white z-10"
      >
        <About />
      </motion.section>

      {/* FAQ SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={frontVariant}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="relative w-full bg-black text-white z-10"
      >
        <FAQ />
      </motion.section>

      {/* TEAM SECTION */}
      <motion.section
        id="teams"   // <-- add this
        initial="hidden"
        whileInView="visible"
        variants={frontVariant}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative w-full bg-black text-white z-10"
      >
        <TeamPage sections={teamSections} />
      </motion.section>


      {/* FOOTER */}
      <footer className="w-full bg-black text-gray-400 py-6 text-center border-t border-white/20">
        &copy; 2025 NASA Space Apps Challenge. All rights reserved.
      </footer>
    </main>
  );
}
