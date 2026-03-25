import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "dark" | "light";
}

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.773.463 3.437 1.268 4.888L2 22l5.25-1.375A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
    ),
    title: "24/7 WhatsApp",
    description:
      "Drop us a message anytime — get instant quotes, schedule inspections, or report issues. Our support team is always a text away.",
    variant: "dark",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: "Brand Warranty",
    description:
      "Every product we install meets ISO standards. We source only from certified manufacturers — built for reliability that outlasts the years.",
    variant: "light",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "Free Inspection",
    description:
      "No job is too small or too large. We visit your site at no charge, assess your requirements, and give you an honest recommendation.",
    variant: "dark",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M5.34 17.66l-1.41 1.41M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M5.34 6.34L3.93 4.93M12 20v2M12 2v2"/>
      </svg>
    ),
    title: "Free Inspection",
    description:
      "We cover every corner of Hyderabad. Book a free on-site visit and let our technicians evaluate your space — zero cost, zero obligation.",
    variant: "light",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: "Experts",
    description:
      "Our crew brings years of hands-on experience. Trained, verified, and proud of their craft — every installation reflects the skill they've mastered.",
    variant: "dark",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    title: "Assured Low Quotes",
    description:
      "Already have a quote? Bring it to us. We'll match or beat it. Transparent pricing with no hidden fees — just honest value for quality work.",
    variant: "light",
  },
];

export const FeatureCard = ({ icon, title, description, variant = "dark" }: FeatureCardProps) => {
  const isDark = variant === "dark";

  return (
    <div
      className={`
        relative rounded-2xl p-6 flex flex-col gap-4 border transition-all duration-300 group cursor-default
        hover:-translate-y-1 hover:shadow-xl
        ${isDark
          ? "bg-black border-gray-800 hover:border-gray-600 hover:shadow-gray-900/40"
          : "bg-white border-gray-200 hover:border-gray-400 hover:shadow-gray-200/60"
        }
      `}
    >
      {/* Icon */}
      <div
        className={`
          w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110
          ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}
        `}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3
          className={`text-base font-bold tracking-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm leading-relaxed ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      </div>

      {/* Subtle corner accent */}
      <div
        className={`
          absolute top-4 right-4 w-1.5 h-1.5 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100
          ${isDark ? "bg-white" : "bg-gray-900"}
        `}
      />
    </div>
  );
};

const FeatureCards = () => {
  return (
    <section className="w-full bg-gray-50 py-16 px-5 md:px-20">
      <div className="">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-2">
            We are best at
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Everything you need,<br />
            <span className="text-gray-400 font-light">nothing you don't.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={feature.variant as "dark" | "light"}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeatureCards;