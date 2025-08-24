"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

interface TeamMember {
    name: string;
    role: string;
    image: string;
    social?: { type: string; url: string }[];
}

interface TeamSectionData {
    title: string;
    members: TeamMember[];
}

interface TeamsProps {
    sections: TeamSectionData[];
}

// ---------- TEAM CARD ----------
const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <motion.div
        className="relative w-64 rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl border border-white/20 overflow-hidden cursor-pointer bg-[rgba(10,10,20,0.7)] backdrop-blur-md"
        whileHover={{ y: -5, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        {/* Member Image */}
        <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-white/30 shadow-lg relative">
            <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="128px"
                priority
            />
        </div>


        <h3 className="text-xl font-bold text-white">{member.name}</h3>
        <p className="text-gray-300 mt-1">{member.role}</p>

        {/* Fixed Social icons - always visible */}
        <div className="flex space-x-4 mt-4">
            {/* Mail */}
            <a
                href={`mailto:${member.social?.[0].url}`}
                className="text-white hover:text-blue-400 transition"
            >
                <Mail size={22} />
            </a>

            {/* Phone */}
            <a
                href={`tel:${member.social?.[1].url}`}
                className="text-white hover:text-blue-400 transition"
            >
                <Phone size={22} />
            </a>
        </div>
    </motion.div>
);


// ---------- TEAM SECTION ----------
const TeamSectionComponent: React.FC<{ section: TeamSectionData }> = ({ section }) => (
    <motion.div
        className="my-16 px-6 sm:px-12 flex flex-col items-center relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
            {section.title}
        </h2>

        {/* Cards centered below heading */}
        <div className="flex flex-wrap justify-center gap-8 w-full">
            {section.members.map((m, i) => (
                <TeamCard key={i} member={m} />
            ))}
        </div>
    </motion.div>
);

// ---------- SPACE NEBULA CANVAS ----------
const SpaceCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return; // safe check

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const stars: { x: number; y: number; radius: number; alpha: number; dx: number; dy: number }[] = [];
        const nebula: { x: number; y: number; radius: number; color: string; dx: number; dy: number }[] = [];

        for (let i = 0; i < 300; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5,
                alpha: Math.random(),
                dx: (Math.random() - 0.5) * 0.05,
                dy: (Math.random() - 0.5) * 0.05,
            });
        }

        const colors = ["#7f00ff", "#ff00ff", "#00ffff", "#ff4500", "#1e90ff"];
        for (let i = 0; i < 40; i++) {
            nebula.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 200 + 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                dx: (Math.random() - 0.5) * 0.02,
                dy: (Math.random() - 0.5) * 0.02,
            });
        }

        function animate() {
            // ✅ non-null assertion for ctx
            ctx!.clearRect(0, 0, width, height);

            stars.forEach((s) => {
                s.x += s.dx;
                s.y += s.dy;
                if (s.x < 0) s.x = width;
                if (s.x > width) s.x = 0;
                if (s.y < 0) s.y = height;
                if (s.y > height) s.y = 0;
                ctx!.beginPath();
                ctx!.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx!.fillStyle = `rgba(255,255,255,${s.alpha})`;
                ctx!.fill();
            });

            nebula.forEach((n) => {
                n.x += n.dx;
                n.y += n.dy;
                if (n.x < -n.radius) n.x = width + n.radius;
                if (n.x > width + n.radius) n.x = -n.radius;
                if (n.y < -n.radius) n.y = height + n.radius;
                if (n.y > height + n.radius) n.y = -n.radius;
                const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
                grad.addColorStop(0, `${n.color}33`);
                grad.addColorStop(1, "transparent");
                ctx!.beginPath();
                ctx!.fillStyle = grad;
                ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
                ctx!.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            width = canvas!.width = window.innerWidth;
            height = canvas!.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0"></canvas>;
};


// ---------- MAIN TEAMS COMPONENT ----------
const Teams: React.FC<TeamsProps> = ({ sections }) => (
    <section className="relative min-h-screen overflow-hidden py-16 bg-black">
        <SpaceCanvas />
        <div className="relative z-10 max-w-7xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-center text-white mt-16 mb-16">
                Our Team
            </h1>
            {sections.map((sec, idx) => (
                <TeamSectionComponent key={idx} section={sec} />
            ))}
        </div>
    </section>
);

export default Teams;
