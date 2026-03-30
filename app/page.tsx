"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const greenStripRef = useRef<HTMLDivElement>(null);
  const revealTextRef = useRef<HTMLHeadingElement>(null);

  const text = "WELCOME ITZFIZZ";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=2500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

    
      tl.to(
        [carRef.current],
        {
          x: "110vw",
          ease: "none",
        },
        0,
      )
        .to(
          greenStripRef.current,
          {
            width: "100%",
            ease: "none",
          },
          0,
        )
        .to(
          revealTextRef.current,
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
          },
          0,
        );

      // 2. STAGGERED CARD POP 
      tl.from(
        ".top-card",
        {
          y: -100,
          opacity: 0,
          rotation: -5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          duration: 0.8,
        },
        0.2,
      ).from(
        ".bottom-card",
        {
          y: 100,
          opacity: 0,
          rotation: 5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          duration: 0.8,
        },
        0.4,
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#f0f0f0] overflow-x-hidden">
      <section
        ref={triggerRef}
        className="relative h-screen flex flex-col items-center justify-center"
      >
        {/* TOP CARDS */}
        <div className="absolute top-[12%] flex gap-5 z-30">
          <Card
            num="58%"
            label="Increase in pick up point use"
            className="top-card bg-[#e2ff31] text-black"
          />
          <Card
            num="27%"
            label="Increase in pick up point use"
            className="top-card bg-neutral-900 text-white"
          />
        </div>

        {/* --- THE TRACK SYSTEM --- */}
        <div className="relative w-full h-[160px] bg-[#111] flex items-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {/* THE PROGRESSIVE GREEN FILL */}
          <div
            ref={greenStripRef}
            className="absolute left-0 h-full w-[0%] bg-[#38ef7d] z-0"
          />

        
          <h1 className="absolute  uppercase italic whitespace-nowrap select-none">
           
          </h1>

          <h1
            ref={revealTextRef}
            className="absolute w-full text-center text-[9vw] font-[900]] tracking-[-0.05em] text-black uppercase italic whitespace-nowrap select-none z-10"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            {text}
          </h1>

          {/* THE CAR */}
          <img
            ref={carRef}
            src="/car.png"
            className="absolute left-[-15%] h-[140%] object-contain z-50 pointer-events-none"
            alt="car"
            style={{ filter: "drop-shadow(30px 10px 20px rgba(0,0,0,0.4))" }}
          />
        </div>
        {/* ------------------------ */}

        {/* BOTTOM CARDS */}
        <div className="absolute bottom-[12%] flex gap-5 z-30">
          <Card
            num="23%"
            label="Decreased in customer phone calls"
            className="bottom-card bg-[#7dd3fc] text-black"
          />
          <Card
            num="40%"
            label="Decreased in customer phone calls"
            className="bottom-card bg-[#ff8a3d] text-black"
          />
        </div>
      </section>

      <div className="h-screen bg-white" />
    </main>
  );
}

function Card({
  num,
  label,
  className,
}: {
  num: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`p-6 rounded-[2rem] w-52 shadow-2xl ${className} border border-white/10`}
    >
      <div className="text-4xl font-black italic mb-1">{num}</div>
      <p className="text-[11px] leading-[1.2] font-bold uppercase tracking-tight">
        {label}
      </p>
    </div>
  );
}
