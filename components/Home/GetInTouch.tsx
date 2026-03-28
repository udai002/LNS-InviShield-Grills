"use client"

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";

const contactItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.83a16 16 0 006.29 6.29l1.15-1.15a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 8144725876",
    href: "tel:+9181447258765",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    hoverBorder: "hover:border-amber-300",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.773.463 3.437 1.268 4.888L2 22l5.25-1.375A9.953 9.953 0 0012.004 22C17.531 22 22 17.523 22 12.004 22 6.477 17.531 2 12.004 2zm0 18.18a8.15 8.15 0 01-4.154-1.135l-.297-.176-3.115.817.83-3.035-.193-.311A8.167 8.167 0 013.82 12.004c0-4.516 3.672-8.184 8.184-8.184 4.517 0 8.185 3.668 8.185 8.184 0 4.512-3.668 8.176-8.185 8.176z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+91 8144725876",
    href: "https://wa.me/918144725876",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    hoverBorder: "hover:border-emerald-300",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "hello@steelcraft.in",
    href: "mailto:hello@steelcraft.in",
    bg: "bg-sky-50",
    iconColor: "text-sky-600",
    hoverBorder: "hover:border-sky-300",
  },
];

// ─── Typed Variants ────────────────────────────────────────────────────────────

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
    transition: { delay: 0.38, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const leftColumnVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

const rightColumnVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

const contactItemVariants: Variants = {
  hidden: { opacity: 0, x: -20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.1 + 0.2,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const iconBubbleVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.14,
    rotate: [0, -8, 8, 0],
    transition: { duration: 0.4 },
  },
};

const arrowVariants: Variants = {
  rest: { x: 0, opacity: 0.4 },
  hover: { x: 4, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

const statusDotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.7, type: "spring", stiffness: 320, damping: 16 },
  },
};

const formFieldVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08 + 0.25,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const submitButtonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { type: "spring", stiffness: 340, damping: 18 } },
  tap: { scale: 0.97 },
};

const alertVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transition: { duration: 0.25 },
  },
};

const successVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25 },
  },
};

const checkmarkVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.6, ease: "easeInOut" },
  },
};

// ─── ContactSection ───────────────────────────────────────────────────────────

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function sendContactDetails() {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: form.message }),
      });
      if (response.ok) {
        setSubmitted(true);
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    sendContactDetails();
  };

  const formFields = [
    { key: "name", label: "Full Name", type: "text", placeholder: "Ramesh Kumar", required: true },
    { key: "email", label: "Email Address", type: "email", placeholder: "ramesh@example.com", required: true },
  ];

  return (
    <section ref={sectionRef} className="w-full py-16 px-5 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-8"
        >
          <motion.p
            variants={headerLineVariants}
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-1"
          >
            Contact Us
          </motion.p>
          <motion.div
            variants={accentLineVariants}
            className="h-[2px] w-8 bg-gray-800 rounded-full origin-left"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── LEFT SIDE ── */}
          <motion.div
            variants={leftColumnVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-300 leading-tight">
              Get in touch <br />
              <motion.span
                className="text-amber-500"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                with us
              </motion.span>
            </h1>

            <motion.p
              className="mt-4 text-gray-500 text-sm leading-relaxed max-w-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.38, duration: 0.5 }}
            >
              Have a question about grills, jali, or installation? Reach out via any
              channel below — we respond within a few hours.
            </motion.p>

            {/* Contact items */}
            <ul className="mt-8 flex flex-col gap-4">
              {contactItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  custom={i}
                  variants={contactItemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <motion.a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-black shadow-sm group ${item.hoverBorder} hover:shadow-md transition-colors duration-200`}
                  >
                    <motion.div
                      variants={iconBubbleVariants}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg} ${item.iconColor}`}
                    >
                      {item.icon}
                    </motion.div>

                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5 group-hover:text-gray-900 transition-colors">
                        {item.value}
                      </p>
                    </div>

                    <motion.div variants={arrowVariants} className="ml-auto text-gray-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </motion.div>
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            {/* Status dot */}
            <motion.p
              variants={statusDotVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-6 text-xs text-gray-400 flex items-center gap-1.5"
            >
              <motion.span
                className="inline-block w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              Available Mon–Sat, 9 AM – 7 PM IST
            </motion.p>
          </motion.div>

          {/* ── RIGHT SIDE — Form ── */}
          <motion.div
            variants={rightColumnVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.05 }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <motion.polyline
                        points="20 6 9 17 4 12"
                        variants={checkmarkVariants}
                        initial="hidden"
                        animate="visible"
                      />
                    </svg>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="text-lg font-bold text-gray-400"
                  >
                    We got your message!
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                    className="text-sm text-gray-500 max-w-xs"
                  >
                    Our team will reach out to you shortly. You can also WhatsApp us for a faster response.
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                    className="mt-2 text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                /* ── Form state ── */
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg font-bold text-gray-300 mb-1"
                  >
                    Send us a message
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.32 }}
                    className="text-xs text-gray-400 mb-6"
                  >
                    We'll get back to you within 24 hours.
                  </motion.p>

                  <div className="flex flex-col gap-4">
                    {/* Name & Email */}
                    {formFields.map((field, i) => (
                      <motion.div
                        key={field.key}
                        custom={i}
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                          {field.label} {field.required && <span className="text-amber-500">*</span>}
                        </label>
                        <input
                          type={field.type}
                          name={field.key}
                          value={form[field.key as keyof typeof form]}
                          onChange={handleChange}
                          onFocus={() => setFocused(field.key)}
                          onBlur={() => setFocused(null)}
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-300 placeholder-gray-300 outline-none transition-all duration-200 ${
                            focused === field.key
                              ? "border-amber-400 ring-2 ring-amber-100 shadow-sm"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        />
                      </motion.div>
                    ))}

                    {/* Phone */}
                    <motion.div
                      custom={2}
                      variants={formFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                        Phone Number <span className="text-amber-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <div className={`flex items-center px-3 rounded-xl border text-sm text-gray-500 transition-all duration-200 ${focused === "phone" ? "border-amber-400 ring-2 ring-amber-100" : "border-gray-200"}`}>
                          🇮🇳 +91
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          onFocus={() => setFocused("phone")}
                          onBlur={() => setFocused(null)}
                          placeholder="98400 12345"
                          className={`flex-1 px-4 py-3 rounded-xl border text-sm text-gray-300 placeholder-gray-300 outline-none transition-all duration-200 ${
                            focused === "phone"
                              ? "border-amber-400 ring-2 ring-amber-100 shadow-sm"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        />
                      </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                      custom={3}
                      variants={formFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                        Message <span className="text-gray-300 font-normal normal-case">(optional)</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        rows={3}
                        placeholder="Tell us about your project — location, type of grill, number of windows..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-300 placeholder-gray-300 outline-none resize-none transition-all duration-200 ${
                          focused === "message"
                            ? "border-amber-400 ring-2 ring-amber-100 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                    </motion.div>

                    {/* Alerts */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          key="error"
                          variants={alertVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-red-900">Failed to send message</p>
                            <p className="text-xs text-red-700 mt-0.5">Please try again or contact us via WhatsApp</p>
                          </div>
                        </motion.div>
                      )}

                      {success && (
                        <motion.div
                          key="success-inline"
                          variants={alertVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="p-3 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-green-900">Message sent successfully!</p>
                            <p className="text-xs text-green-700 mt-0.5">We'll get back to you shortly</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.div
                      custom={4}
                      variants={formFieldVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.button
                        variants={submitButtonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleSubmit}
                        className="mt-1 w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
                      >
                        Send Message
                        <motion.svg
                          width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          variants={{ rest: { x: 0 }, hover: { x: 3 } }}
                          transition={{ type: "spring", stiffness: 320, damping: 18 }}
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </motion.svg>
                      </motion.button>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.65 }}
                      className="text-center text-xs text-gray-400"
                    >
                      Or reach us instantly on{" "}
                      <motion.a
                        href="https://wa.me/918144725876"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        className="text-emerald-600 font-semibold hover:underline inline-block"
                      >
                        WhatsApp ↗
                      </motion.a>
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;