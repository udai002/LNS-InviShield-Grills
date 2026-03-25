import React from 'react'

interface IChooseUsList{
    id:number ;
    title:string;
    description:string
}

const chooseUsList:IChooseUsList[] = [
  {
    id: 1,
    title: "ISI Certified Steel",
    description:
      "All MS & SS materials meet BIS standards. Rust-resistant, high-tensile grade for long-term safety.",
  },
  {
    id: 2,
    title: "Transparent Pricing",
    description:
      "No hidden charges. Price per sqft quoted upfront — GST invoice provided on all orders.",
  },
  {
    id: 3,
    title: "48-Hour Installation",
    description:
      "Measurement to installation in 48 hours. Zero mess, zero hassle, professional team.",
  },
  {
    id: 4,
    title: "5-Year Warranty",
    description:
      "Full 5-year warranty covering material, welding defects and durability assurance.",
  },
];


const FeatureCard = ({ id, title, description }:IChooseUsList) => {
  return (
    <div className="relative p-10 border border-gray-800 bg-black text-white">
      {/* Big Number */}
      <span className="text-4xl font-bold text-gray-400 opacity-30">
        {String(id).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const processList:IChooseUsList[] = [
  {
    id: 1,
    title: "WhatsApp / Call Us",
    description:
      "Share your balcony size and grill requirement. We'll respond within 1 hour.",
  },
  {
    id: 2,
    title: "Free Site Visit",
    description:
      "Our team visits your home for accurate measurements — completely free of charge.",
  },
  {
    id: 3,
    title: "Design & Fabrication",
    description:
      "We fabricate your custom grills at our workshop using ISI certified materials.",
  },
  {
    id: 4,
    title: "Installation & Handover",
    description:
      "Clean installation by our team. Final inspection done before handover.",
  },
];


const StepCard = ({ id, title, description }:IChooseUsList) => {
  return (
    <div className="text-center max-w-xs mx-auto">
      {/* Circle Number */}
      <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-black text-white text-lg font-semibold">
        {String(id).padStart(2, "0")}
      </div>

      {/* Title */}
      <h3 className="mt-6 text-lg font-semibold">{title}</h3>

      {/* Description */}
      <p className="mt-2 text-gray-500 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const WhyChooseUs = () => {
    return (
        <>
        <div className='bg-black p-10 md:p-20 text-white'>
            <h1 className='space-x-9'>why choose us</h1>
            <h1 className='font-extrabold text-3xl text-white mb-2'>India's most trusted
                grill fabricators</h1>

            <p className='text-gray-400'>From raw material to final installation — we handle everything with quality and care.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5">
      {chooseUsList.map((item) => (
        <FeatureCard
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
        </div>
        <section className="py-16 bg-gray-100 text-center">
      {/* Header */}
      <p className="text-sm tracking-widest text-gray-500 uppercase">
        Simple Process
      </p>

      <h2 className="text-3xl font-bold mt-2">
        Order in 4 easy steps
      </h2>

      <p className="text-gray-600 mt-3">
        Getting your grill installed is as easy as sending a WhatsApp message.
      </p>

      {/* Steps Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {processList.map((step) => (
          <StepCard
            key={step.id}
            id={step.id}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>

        </>
    )
}

export default WhyChooseUs
