"use client";

import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Montserrat } from "next/font/google";
import { ExternalLink } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

// Container for stagger
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

// Fade-up for text
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

// Scale-in for cards
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className={`relative min-h-screen px-6 pt-32 pb-16 scroll-mt-28 text-white overflow-hidden ${montserrat.className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1f] to-black z-0" />

      {/* Fullscreen background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about-bg.png"
          alt="About Background"
          fill
          priority
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
      </div>

      {/* Content wrapper */}
      <motion.div
        variants={containerVariants}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >
        {/* Hero Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-snug drop-shadow-xl"
        >
          <Balancer>About the Event & Participation</Balancer>
        </motion.h2>

        {/* Intro */}
        <motion.p
          variants={fadeUp}
          className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-200 mb-8"
        >
          <Balancer>
            Join the world’s largest hackathon, bringing together coders, makers,
            designers, storytellers, and innovators from across the globe to solve
            real challenges faced by NASA.
          </Balancer>
        </motion.p>

        {/* Registration Info */}
        <motion.p
          variants={fadeUp}
          className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-200 mb-12"
        >
          <Balancer>
            <span className="font-semibold text-white">Registration:</span> First
            register officially on{" "}
            <a
              href="https://www.spaceappschallenge.org/2025/local-events/jabalpur/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-4 decoration-cyan-400 hover:text-cyan-300 transition"
            >
              NASA Space Apps <ExternalLink className="w-4 h-4" />
            </a>
            then secure your{" "}
            <span className="text-cyan-400 font-semibold">Jabalpur Local Edition</span>{" "}
            spot via{" "}
            <a
              href="https://unstop.com/hackathons/nasa-space-apps-challenge-2025-jabalpur-edition-gyan-ganga-institute-of-technology-and-sciences-1543268?lb=b0oCYV50&utm_medium=Share&utm_source=nihalyad4001&utm_campaign=Innovation_challenge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-4 decoration-purple-400 hover:text-purple-300 transition"
            >
              Unstop <ExternalLink className="w-4 h-4" />
            </a>
            .
          </Balancer>
        </motion.p>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Global Impact",
              desc: "Be part of an international community solving space & Earth challenges.",
            },
            {
              title: "Collaborative Innovation",
              desc: "Work with diverse teams to create groundbreaking solutions.",
            },
            {
              title: "NASA Recognition",
              desc: "Get your ideas noticed by NASA scientists & experts.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
