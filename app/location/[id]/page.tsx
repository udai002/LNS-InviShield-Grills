'use client'
import { useGetGalleryQuery } from '@/redux/GallerySlice'
import { useGetLocationByIdQuery } from '@/redux/locationSlice'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Head from 'next/head'
import { motion } from 'framer-motion'
import ContactSection from '@/components/Home/GetInTouch'

interface IGalleryItem {
  _id: string
  imageUrl: string
  category: string
  locationId: {
    _id: string
    city: string
    area: string
    state: string
    pincode: string
  }
  createdAt: string
}

interface ILocationData {
  _id: string
  city: string
  area: string
  state: string
  pincode: string
  description: string
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const categoryColors: Record<string, string> = {
  Window: 'bg-blue-100 text-blue-800',
  bolcony: 'bg-green-100 text-green-800',
  'Window Grills': 'bg-purple-100 text-purple-800',
}

const getCategoryColor = (cat: string) =>
  categoryColors[cat] ?? 'bg-gray-100 text-gray-700'

// ── Skeleton loaders ──────────────────────────────────────────────────────────
const HeroSkeleton = () => (
  <div className="w-full h-[480px] bg-gray-200 animate-pulse" />
)

const GallerySkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map(i => (
      <div key={i} className="rounded-2xl bg-gray-200 animate-pulse h-64" />
    ))}
  </div>
)

// ── Hero section ──────────────────────────────────────────────────────────────
const HeroSection = ({ location }: { location: ILocationData }) => (
  <section className="relative w-full h-[480px] md:h-[560px] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('/hero-grills.jpg')` }}
    />
    <div className="relative z-20 flex flex-col justify-end h-full px-6 md:px-16 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/30">
          {location.state}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Invisible Grills <br />
          <span className="text-green-400">{location.city}</span>
        </h1>
        <p className="mt-4 text-white/80 text-lg max-w-2xl leading-relaxed">
          {location.description ||
            `Premium invisible grill installations in ${location.area}, ${location.city}. 
             Trusted by hundreds of families for safety without compromising your view.`}
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm px-4 py-1.5 rounded-full">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            {location.area}, {location.city} — {location.pincode}
          </span>
          
          
        </div>
      </motion.div>
    </div>
  </section>
)

// ── Info chips ─────────────────────────────────────────────────────────────────
const InfoChips = ({ location }: { location: ILocationData }) => (
  <section className="bg-white border-b border-gray-100">
    <div className="max-w-6xl mx-auto px-6 md:px-16 py-5 flex flex-wrap gap-6 items-center text-sm text-gray-600">
      {[
        { label: 'Area', value: location.area },
        { label: 'City', value: location.city },
        { label: 'State', value: location.state },
        { label: 'Pincode', value: location.pincode },
      ].map(chip => (
        <div key={chip.label} className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">{chip.label}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="text-gray-800 font-semibold">{chip.value}</span>
        </div>
      ))}
    </div>
  </section>
)

// ── SEO Description ───────────────────────────────────────────────────────────
const SeoDescription = ({ location }: { location: ILocationData }) => (
  <section className="max-w-6xl mx-auto px-6 md:px-16 py-14">
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-green-600 text-sm font-semibold tracking-widest uppercase">
          Why choose us
        </span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
          Invisible Grills in {location.area}, {location.city}
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          LNS InviShield provides industry-leading invisible grill solutions across {location.city}.
          Our installations in {location.area} are designed to give you unobstructed views while
          ensuring the safety of your loved ones — no bars, no clutter, just clarity.
        </p>
        <p className="mt-3 text-gray-600 leading-relaxed">
          Each grill is crafted from marine-grade stainless steel, engineered to withstand
          {location.state}'s climate conditions. From residential balconies to commercial
          windows, we handle every project with precision and care.
        </p>
        <ul className="mt-6 space-y-2">
          {[
            'Zero-visibility design — preserves your view',
            'Child & pet safe — tested to 200kg load',
            'Rust-proof marine-grade stainless steel',
            'Quick installation — no drilling required',
            'Free site visit & consultation in ' + location.city,
          ].map(point => (
            <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
              <svg className="mt-0.5 shrink-0 text-green-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              {point}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 gap-4"
      >
        {[
          { num: '500+', label: 'Homes installed' },
          { num: '8+', label: 'Years experience' },
          { num: '100%', label: 'Safe & certified' },
          { num: '4.9★', label: 'Customer rating' },
        ].map(stat => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-6 flex flex-col items-center justify-center text-center"
          >
            <span className="text-3xl font-bold text-green-600">{stat.num}</span>
            <span className="mt-1 text-xs text-gray-500 font-medium">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
)

// ── Gallery ───────────────────────────────────────────────────────────────────
const GallerySection = ({ gallery }: { gallery: IGalleryItem[] }) => (
  <section className="bg-gray-50 py-14">
    <div className="max-w-6xl mx-auto px-6 md:px-16">
      <div className="mb-8">
        <span className="text-green-600 text-sm font-semibold tracking-widest uppercase">Our work</span>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">Installation gallery</h2>
        <p className="mt-2 text-gray-500 text-sm">
          Real installations by our team — every photo from an actual project.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={
                  item?.imageUrl
                }
                alt={`${item.category} invisible grill installation in ${item.locationId?.area ?? ''}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(item.category)}`}
              >
                {item.category}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(item.createdAt).toLocaleDateString('en-IN', {
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {gallery.length === 0 && (
        <p className="text-center text-gray-400 py-12">No gallery images yet for this location.</p>
      )}
    </div>
  </section>
)

// ── Contact section ───────────────────────────────────────────────────────────

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LocationScreen() {
  const params = useParams()
  const id = params.id as string

  const { data: gallery = [], isLoading: galleryLoading } = useGetGalleryQuery(id)
  const { data: locationData, isLoading: locationLoading, isError: locationError } =
    useGetLocationByIdQuery(id)

  if (locationLoading) return <HeroSkeleton />

  if (locationError || !locationData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <p className="text-xl font-semibold">Location not found</p>
        <p className="text-sm mt-2">The location you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>
          Invisible Grills in {locationData.area}, {locationData.city} | LNS InviShield
        </title>
        <meta
          name="description"
          content={`Buy & install premium invisible grills in ${locationData.area}, ${locationData.city}, ${locationData.state} - ${locationData.pincode}. Safe, rust-proof, child-friendly. Free site visit. Call LNS InviShield.`}
        />
        <meta
          name="keywords"
          content={`invisible grills ${locationData.city}, invisible grills ${locationData.area}, window grills ${locationData.city}, balcony grills ${locationData.state}, ${locationData.pincode} grills`}
        />
        <meta property="og:title" content={`Invisible Grills in ${locationData.city} | LNS InviShield`} />
        <meta
          property="og:description"
          content={`Premium invisible grill installations in ${locationData.area}, ${locationData.city}. Trusted, certified, and affordable.`}
        />
      </Head>

      <main>
        <HeroSection location={locationData} />
        <InfoChips location={locationData} />
        <SeoDescription location={locationData} />
        {galleryLoading ? (
          <div className="max-w-6xl mx-auto px-6 md:px-16 py-14">
            <GallerySkeleton />
          </div>
        ) : (
          <GallerySection gallery={gallery} />
        )}
        <div className='p-10 bg-black'>
       <ContactSection/>

        </div>
      </main>
    </>
  )
}