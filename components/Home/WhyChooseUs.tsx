"use client"

import React from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface IChooseUsList {
  id: number;
  title: string;
  description: string;
}

const chooseUsList: IChooseUsList[] = [
  {
    id: 1,
    title: "ISI Certified Steel",
    description: "All MS & SS materials meet BIS standards. Rust-resistant, high-tensile grade for long-term safety.",
  },
  {
    id: 2,
    title: "Transparent Pricing",
    description: "No hidden charges. Price per sqft quoted upfront — GST invoice provided on all orders.",
  },
  {
    id: 3,
    title: "48-Hour Installation",
    description: "Measurement to installation in 48 hours. Zero mess, zero hassle, professional team.",
  },
  {
    id: 4,
    title: "5-Year Warranty",
    description: "Full 5-year warranty covering material, welding defects and durability assurance.",
  },
]

const processList: IChooseUsList[] = [
  {
    id: 1,
    title: "WhatsApp / Call Us",
    description: "Share your balcony size and grill requirement. We'll respond within 1 hour.",
  },
  {
    id: 2,
    title: "Free Site Visit",
    description: "Our team visits your home for accurate measurements — completely free of charge.",
  },
  {
    id: 3,
    title: "Design & Fabrication",
    description: "We fabricate your custom grills at our workshop using ISI certified materials.",
  },
  {
    id: 4,
    title: "Installation & Handover",
    description: "Clean installation by our team. Final inspection done before handover.",
  },
]

// ─── Typed Variants ───────────────────────────────────────────────────────────

const sectionHeaderVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
}

const headerLineVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const accentLineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { delay: 0.38, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const featureCardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const numberVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number) => ({
    opacity: 0.18,
    scale: 1,
    transition: {
      delay: i * 0.1 + 0.2,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const cardContentVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1 + 0.3,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const bottomBarVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

const stepCircleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.13 + 0.1,
      type: 'spring',
      stiffness: 260,
      damping: 18,
    },
  }),
}

const stepContentVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.13 + 0.28,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const connectorVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: {
      delay: i * 0.13 + 0.45,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

// ─── FeatureCard ─────────────────────────────────────────────────────────────

const FeatureCard = ({ id, title, description }: IChooseUsList) => {
  const index = id - 1
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={featureCardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{
        y: -6,
        borderColor: 'rgba(255,255,255,0.22)',
        transition: { type: 'spring', stiffness: 280, damping: 18 },
      }}
      className="relative p-10 border border-gray-800 bg-black text-white overflow-hidden group"
    >
      {/* Hover radial spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            'radial-gradient(220px circle at 50% 0%, rgba(255,255,255,0.06), transparent 70%)',
        }}
      />

      {/* Big background number */}
      <motion.span
        custom={index}
        variants={numberVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="text-6xl font-black text-gray-300 select-none block"
      >
        {String(id).padStart(2, '0')}
      </motion.span>

      {/* Card content */}
      <motion.div
        custom={index}
        variants={cardContentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="mt-8"
      >
        <h3 className="text-lg font-semibold mb-3 group-hover:text-gray-100 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </motion.div>

      {/* Bottom accent bar — grows on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full bg-white origin-left"
        variants={bottomBarVariants}
        initial="hidden"
        whileHover="visible"
      />
    </motion.div>
  )
}

// ─── StepCard ────────────────────────────────────────────────────────────────

interface IStepCard extends IChooseUsList {
  isLast: boolean;
}

const StepCard = ({ id, title, description, isLast }: IStepCard) => {
  const index = id - 1
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="relative text-center max-w-xs mx-auto">

      {/* Connector line to next step */}
      {!isLast && (
        <motion.div
          custom={index}
          variants={connectorVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden lg:block absolute top-8 left-[calc(50%+2.2rem)] w-[calc(100%-2rem)] h-px bg-gray-300 origin-left"
        />
      )}

      {/* Animated circle */}
      <motion.div
        custom={index}
        variants={stepCircleVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        whileHover={{
          scale: 1.14,
          rotate: [0, -6, 6, 0],
          transition: { duration: 0.4 },
        }}
        className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-black text-white text-lg font-semibold shadow-lg cursor-default"
      >
        {String(id).padStart(2, '0')}
      </motion.div>

      {/* Title & description */}
      <motion.div
        custom={index}
        variants={stepContentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <h3 className="mt-6 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">{description}</p>
      </motion.div>
    </div>
  )
}

// ─── WhyChooseUs ─────────────────────────────────────────────────────────────

const WhyChooseUs = () => {
  const headerRef = React.useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' })

  const processHeaderRef = React.useRef(null)
  const isProcessHeaderInView = useInView(processHeaderRef, { once: true, margin: '-60px' })

  return (
    <section id='why-us'>
      {/* ── Why Choose Us ───────────────────────────────────────── */}
      <div className="bg-black p-10 md:p-20 text-white">

        <motion.div
          ref={headerRef}
          variants={sectionHeaderVariants}
          initial="hidden"
          animate={isHeaderInView ? 'visible' : 'hidden'}
          className="mb-8"
        >
          <motion.p
            variants={headerLineVariants}
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500 mb-1"
          >
            Why choose us
          </motion.p>

          <motion.h1
            variants={headerLineVariants}
            className="font-extrabold text-3xl md:text-4xl text-white leading-tight"
          >
            India's most trusted<br />
            <span className="text-gray-400 font-light">grill fabricators</span>
          </motion.h1>

          <motion.p
            variants={headerLineVariants}
            className="text-gray-400 mt-3 text-base max-w-lg"
          >
            From raw material to final installation — we handle everything with quality and care.
          </motion.p>

          <motion.div
            variants={accentLineVariants}
            className="mt-5 h-[2px] w-10 bg-white rounded-full origin-left"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {chooseUsList.map((item) => (
            <FeatureCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      {/* ── Process Steps ───────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-20 bg-gray-100 text-center">

        <motion.div
          ref={processHeaderRef}
          variants={sectionHeaderVariants}
          initial="hidden"
          animate={isProcessHeaderInView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <motion.p
            variants={headerLineVariants}
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400"
          >
            Simple Process
          </motion.p>

          <motion.h2
            variants={headerLineVariants}
            className="text-3xl font-bold mt-2"
          >
            Order in 4 easy steps
          </motion.h2>

          <motion.p
            variants={headerLineVariants}
            className="text-gray-600 mt-3 max-w-md mx-auto text-sm"
          >
            Getting your grill installed is as easy as sending a WhatsApp message.
          </motion.p>

          <motion.div
            variants={accentLineVariants}
            className="mt-5 h-[2px] w-10 bg-black rounded-full origin-left mx-auto"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {processList.map((step, i) => (
            <StepCard
              key={step.id}
              {...step}
              isLast={i === processList.length - 1}
            />
          ))}
        </div>
      </section>
    </section>
  )
}

export default WhyChooseUs