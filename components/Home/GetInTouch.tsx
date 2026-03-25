import React, { useState } from "react";

const contactItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.83a16 16 0 006.29 6.29l1.15-1.15a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
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
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.773.463 3.437 1.268 4.888L2 22l5.25-1.375A9.953 9.953 0 0012.004 22C17.531 22 22 17.523 22 12.004 22 6.477 17.531 2 12.004 2zm0 18.18a8.15 8.15 0 01-4.154-1.135l-.297-.176-3.115.817.83-3.035-.193-.311A8.167 8.167 0 013.82 12.004c0-4.516 3.672-8.184 8.184-8.184 4.517 0 8.185 3.668 8.185 8.184 0 4.512-3.668 8.176-8.185 8.176z"/>
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
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
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

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setSubmitted(true);
  };

  return (
    <section className="w-full py-16 px-5 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-2">
          Contact Us
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── LEFT SIDE ── */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-300 leading-tight">
              Get in touch <br />
              <span className="text-amber-500">with us</span>
            </h1>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-sm">
              Have a question about grills, jali, or installation? Reach out via any
              channel below — we respond within a few hours.
            </p>

            {/* Contact items */}
            <ul className="mt-8 flex flex-col gap-4">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-black shadow-sm transition-all duration-200 group ${item.hoverBorder} hover:shadow-md`}
                  >
                    {/* Icon bubble */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg} ${item.iconColor} transition-transform duration-200 group-hover:scale-110`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 mt-0.5 group-hover:text-gray-900 transition-colors">
                        {item.value}
                      </p>
                    </div>
                    {/* Arrow */}
                    <div className="ml-auto text-gray-300 group-hover:text-gray-500 transition-all duration-200 group-hover:translate-x-0.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            {/* Office hours note */}
            <p className="mt-6 text-xs text-gray-400 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              Available Mon–Sat, 9 AM – 7 PM IST
            </p>
          </div>

          {/* ── RIGHT SIDE — Form ── */}
          <div className=" rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-14 h-14 rounded-full  flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">We got your message!</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Our team will reach out to you shortly. You can also WhatsApp us for a faster response.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                  className="mt-2 text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold text-gray-300 mb-1">Send us a message</h2>
                <p className="text-xs text-gray-400 mb-6">We'll get back to you within 24 hours.</p>

                <div className="flex flex-col gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Full Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="Ramesh Kumar"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-200 ${
                        focused === "name"
                          ? "border-amber-400 ring-2 ring-amber-100 shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Email Address <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="ramesh@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-300 outline-none transition-all duration-200 ${
                        focused === "email"
                          ? "border-amber-400 ring-2 ring-amber-100 shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Phone Number <span className="text-amber-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <div className={`flex items-center px-3 rounded-xl border text-sm text-gray-500 transition-all duration-200 ${
                        focused === "phone" ? "border-amber-400 ring-2 ring-amber-100" : "border-gray-200"
                      }`}>
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
                        className={`flex-1 px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-300  outline-none transition-all duration-200 ${
                          focused === "phone"
                            ? "border-amber-400 ring-2 ring-amber-100 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
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
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-300  outline-none resize-none transition-all duration-200 ${
                        focused === "message"
                          ? "border-amber-400 ring-2 ring-amber-100 shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    className="mt-1 w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-semibold tracking-wide transition-all duration-200 hover:bg-gray-700 active:scale-[0.98] shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
                  >
                    Send Message
                    <svg
                      width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    Or reach us instantly on{" "}
                    <a href="https://wa.me/919840012345" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-semibold hover:underline">
                      WhatsApp ↗
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;