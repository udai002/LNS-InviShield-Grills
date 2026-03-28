"use client"

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";

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

// ─── Typed Variants ───────────────────────────────────────────────────────────

const sectionHeaderVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const headerLineVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const accentLineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const carouselWrapperVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.97,
    filter: "blur(3px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.97,
    filter: "blur(3px)",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

const starVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4, y: 4 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      type: "spring",
      stiffness: 320,
      damping: 16,
    },
  }),
};

const avatarVariants: Variants = {
  hidden: { scale: 0, opacity: 0, rotate: -10 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { delay: 0.1, type: "spring", stiffness: 280, damping: 18 },
  },
};

const authorInfoVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.18, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const navButtonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { type: "spring", stiffness: 360, damping: 18 } },
  tap: { scale: 0.93 },
};

const dotVariants: Variants = {
  inactive: { width: 8, backgroundColor: "#d1d5db" },
  active: {
    width: 20,
    backgroundColor: "#111827",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const controlsRowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.55, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Testimonial ─────────────────────────────────────────────────────────────

const Testimonial = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const goTo = useCallback(
    (index: number, dir: number) => {
      if (index === current) return;
      setDirection(dir);
      setProgress(0);
      startTimeRef.current = Date.now();
      setCurrent(index);
    },
    [current]
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % testimonials.length, 1);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, -1);
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

  const item = testimonials[current];

  return (
    <section id="testimonial"
      ref={sectionRef}
      className="w-full bg-[#F7F7F5] py-16 px-5 md:px-10"
    >
      <div
        className="w-full lg:w-1/2 mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Header ── */}
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            variants={headerLineVariants}
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400"
          >
            Customer Reviews
          </motion.p>

          <motion.h2
            variants={headerLineVariants}
            className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight"
          >
            Trusted by{" "}
            <motion.span
              className="text-amber-500"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.32, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              5000+
            </motion.span>{" "}
            Indian families
          </motion.h2>

          <motion.p
            variants={headerLineVariants}
            className="mt-3 text-sm text-gray-500"
          >
            Real reviews from real homeowners across India.
          </motion.p>

          <motion.div
            variants={accentLineVariants}
            className="mt-4 h-[2px] w-10 bg-gray-900 rounded-full origin-left"
          />
        </motion.div>

        {/* ── Carousel Row ── */}
        <motion.div
          variants={carouselWrapperVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 flex items-center gap-3"
        >
          {/* Prev button */}
          <motion.button
            variants={navButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={goPrev}
            aria-label="Previous"
            className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 shadow-sm hover:bg-gray-900 hover:border-gray-900 hover:text-white transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.button>

          {/* Card track */}
          <div className="relative flex-1 min-h-[230px] md:min-h-[210px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={item.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 md:p-7 w-full"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={starVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-amber-400 text-lg leading-none"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                {/* Review text */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-gray-600 italic text-sm md:text-[15px] leading-relaxed mb-6"
                >
                  "{item.review}"
                </motion.p>

                {/* User info */}
                <div className="flex items-center gap-3">
                  <motion.div
                    variants={avatarVariants}
                    initial="hidden"
                    animate="visible"
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ring-2 flex-shrink-0
                      ${avatarStyles[current % avatarStyles.length].bg}
                      ${avatarStyles[current % avatarStyles.length].text}
                      ${avatarStyles[current % avatarStyles.length].ring}`}
                  >
                    {item.initials}
                  </motion.div>

                  <motion.div
                    variants={authorInfoVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.location}</p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next button */}
          <motion.button
            variants={navButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onClick={goNext}
            aria-label="Next"
            className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 shadow-sm hover:bg-gray-900 hover:border-gray-900 hover:text-white transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </motion.button>
        </motion.div>

        {/* ── Controls Row ── */}
        <motion.div
          variants={controlsRowVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-5 flex items-center gap-3"
        >
          {/* Animated pill dots */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                variants={dotVariants}
                animate={idx === current ? "active" : "inactive"}
                onClick={() => goTo(idx, idx > current ? 1 : -1)}
                aria-label={`Go to slide ${idx + 1}`}
                className="h-2 rounded-full"
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="flex-1 h-px bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gray-800 rounded-full origin-left"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>

          {/* Slide counter */}
          <motion.span
            key={current}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-xs text-gray-400 tabular-nums flex-shrink-0"
          >
            {current + 1} / {testimonials.length}
          </motion.span>

          {/* Pause / Play */}
          <motion.button
            whileHover={{ scale: 1.12, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume" : "Pause"}
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-200"
          >
            <AnimatePresence mode="wait">
              {paused ? (
                <motion.svg
                  key="play"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  width="11" height="11" viewBox="0 0 24 24" fill="currentColor"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="pause"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  width="11" height="11" viewBox="0 0 24 24" fill="currentColor"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;