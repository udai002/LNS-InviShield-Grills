"use client"

import React, { useState, useEffect, useRef, useCallback } from "react";

interface TestimonialCardProps {
  id: number;
  name: string;
  location: string;
  review: string;
  rating: number;
  initials: string;
}

export const testimonials: TestimonialCardProps[] = [
  {
    id: 1,
    name: "Ramesh Kumar",
    location: "Anna Nagar, Chennai",
    review:
      "Got balcony grills for my 2BHK in Anna Nagar. The quality is top-notch, powder coating is excellent and the installation team was very clean. 100% recommend!",
    rating: 5,
    initials: "RK",
  },
  {
    id: 2,
    name: "Supriya Patil",
    location: "Koramangala, Bangalore",
    review:
      "Very professional. Site visit happened same day, got quotation in 2 hours, and installation was done within 2 days. Price was fair and GST invoice was provided.",
    rating: 5,
    initials: "SP",
  },
  {
    id: 3,
    name: "Ashwin Menon",
    location: "Thrissur, Kerala",
    review:
      "Ordered decorative jali for main door and window grills for 3 rooms. Both look beautiful. The team was punctual and completed the work in a single day.",
    rating: 5,
    initials: "AM",
  },
];

const AUTOPLAY_DURATION = 4000;

const avatarStyles = [
  { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
  { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-200" },
  { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
];

const Testimonial = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (animating || index === current) return;
      setDirection(dir);
      setPrev(current);
      setAnimating(true);
      setProgress(0);
      startTimeRef.current = Date.now();
      setTimeout(() => {
        setCurrent(index);
        setPrev(null);
        setAnimating(false);
      }, 480);
    },
    [animating, current]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % testimonials.length, "next");
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, "prev");
  }, [current, goTo]);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(goNext, AUTOPLAY_DURATION);
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100));
    }, 30);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [paused, goNext]);

  const getCardTransform = (idx: number) => {
    const isActive = idx === current;
    const isPrev = idx === prev;

    if (!isActive && !isPrev) return { display: "none" as const };

    const enterX = direction === "next" ? 50 : -50;
    const exitX = direction === "next" ? -50 : 50;

    if (isActive) {
      return {
        display: "block" as const,
        transform: animating ? `translateX(${enterX}px)` : "translateX(0px)",
        opacity: animating ? 0 : 1,
        transition: "transform 0.48s cubic-bezier(0.22,1,0.36,1), opacity 0.48s ease",
        position: "relative" as const,
        zIndex: 2,
      };
    }
    return {
      display: "block" as const,
      transform: animating ? `translateX(${exitX}px)` : "translateX(0px)",
      opacity: animating ? 0 : 1,
      transition: "transform 0.48s cubic-bezier(0.22,1,0.36,1), opacity 0.48s ease",
      position: "absolute" as const,
      inset: 0,
      zIndex: 1,
    };
  };

  return (
    <section className="w-full bg-[#F7F7F5] py-16 px-5 md:px-10">
      {/* lg+: centered at 50% width | mobile: full width */}
      <div
        className="w-full lg:w-1/2 mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Header */}
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400">
          Customer Reviews
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          Trusted by{" "}
          <span className="text-amber-500">5000+</span> Indian families
        </h2>
        <p className="mt-3 text-sm text-gray-500">
          Real reviews from real homeowners across India.
        </p>

        {/* Carousel row */}
        <div className="mt-10 flex items-center gap-3">
          {/* Prev */}
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-900 hover:border-gray-900 hover:text-white hover:scale-105 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Track */}
          <div className="relative flex-1 min-h-[230px] md:min-h-[210px]">
            {testimonials.map((item, idx) => (
              <div
                key={item.id}
                style={getCardTransform(idx)}
                className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 md:p-7 w-full"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg leading-none">★</span>
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-600 italic text-sm md:text-[15px] leading-relaxed mb-6">
                  "{item.review}"
                </p>

                {/* User info */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ring-2 flex-shrink-0 ${avatarStyles[idx % avatarStyles.length].bg} ${avatarStyles[idx % avatarStyles.length].text} ${avatarStyles[idx % avatarStyles.length].ring}`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={goNext}
            aria-label="Next"
            className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 shadow-sm transition-all duration-200 hover:bg-gray-900 hover:border-gray-900 hover:text-white hover:scale-105 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Controls row */}
        <div className="mt-5 flex items-center gap-3">
          {/* Pill dots */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx, idx > current ? "next" : "prev")}
                aria-label={`Go to slide ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  idx === current
                    ? "w-5 h-2 bg-gray-900"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="flex-1 h-px bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-800 rounded-full"
              style={{
                width: `${progress}%`,
                transition: "width 50ms linear",
              }}
            />
          </div>

          {/* Slide counter */}
          <span className="text-xs text-gray-400 tabular-nums flex-shrink-0">
            {current + 1} / {testimonials.length}
          </span>

          {/* Pause / Play */}
          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume" : "Pause"}
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            {paused ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;