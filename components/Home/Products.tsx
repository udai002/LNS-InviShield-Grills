"use client"

import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion'
import { Oswald, Inter, IBM_Plex_Mono } from 'next/font/google'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'

const oswald = Oswald({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })

interface IProductList {
    imageUrl: string
    title: string
    id: string
    label: string
    description: string
    tag: string
    spec: string
}

const productList: IProductList[] = [
    {
        id: '1',
        imageUrl: '/grills1.jpeg',
        title: 'Balcony safety nets',
        label: 'Safety',
        description: 'Modern MS grill for balconies with anti-rust coating',
        tag: 'Popular',
        spec: 'MS · Powder Coated',
    },
    {
        id: '2',
        imageUrl: '/grills2.png',
        title: 'Window safety nets',
        label: 'Security',
        description: 'Stainless steel grill designed for window safety',
        tag: 'Best Seller',
        spec: 'SS 304 · Brushed',
    },
    {
        id: '3',
        imageUrl: '/grills3.jpeg',
        title: 'Window mosquito net',
        label: 'Protection',
        description: 'Heavy-duty iron grill for main doors',
        tag: 'Premium',
        spec: 'Iron · Reinforced',
    },
    {
        id: '4',
        imageUrl: '/grills4.jpeg',
        title: 'Window mosquito net',
        label: 'Safety',
        description: 'Elegant grill system for staircase railings',
        tag: 'New',
        spec: 'MS · Matte Black',
    },
    {
        id: '5',
        imageUrl: '/cricketgrills.jpeg',
        title: 'Cricket sports nets',
        label: 'Security',
        description: 'Stainless steel grill designed for cricket practice areas',
        tag: 'Popular',
        spec: 'SS 316 · Invisible',
    },
    {
        id: '6',
        imageUrl: '/hoursegriils.jpeg',
        title: 'Cloth hangers',
        label: 'Protection',
        description: 'Custom-designed grill for residential homes',
        tag: 'Best Seller',
        spec: 'MS · Custom Design',

    }
]

const tagColors: Record<string, string> = {
    'Popular': 'bg-[#E3A008]/15 text-[#B87E00] ring-1 ring-[#E3A008]/30',
    'Best Seller': 'bg-[#E3A008]/15 text-[#B87E00] ring-1 ring-[#E3A008]/30',
    'Premium': 'bg-white/10 text-white ring-1 ring-white/25',
    'New': 'bg-white/10 text-white ring-1 ring-white/25',
}

const labelColors: Record<string, string> = {
    'Safety': 'text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200',
    'Security': 'text-sky-700 bg-sky-50 ring-1 ring-sky-200',
    'Protection': 'text-rose-700 bg-rose-50 ring-1 ring-rose-200',
}

// Repeating diagonal grille motif — echoes the crosshatch of the physical product
const GrilleMesh = ({ className = '', opacity = 0.5 }: { className?: string; opacity?: number }) => (
    <svg className={className} width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
        <defs>
            <pattern id="grille-mesh" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="1" opacity={opacity} />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grille-mesh)" />
    </svg>
)

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 36, scale: 0.97 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    }),
}

const headerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const headerItemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const ProductItemCard = ({
    item,
    index,
    onOpen,
}: {
    item: IProductList
    index: number
    onOpen: (i: number) => void
}) => {
    const { imageUrl, title, tag, description, label, spec } = item

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            whileHover="hover"
            className="group relative overflow-hidden rounded-xl ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_20px_48px_rgba(0,0,0,0.22)]"
        >
            {/* Full-bleed background-image gallery tile */}
            <button
                type="button"
                onClick={() => onOpen(index)}
                className="relative block w-full h-72 sm:h-80 lg:h-[22rem] overflow-hidden bg-[#15181C] text-left"
                aria-label={`Open ${title} in gallery view`}
            >
                <motion.img
                    src={imageUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial="rest"
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* base scrim — always on, keeps resting title + badges legible */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25" />

                {/* extra darken on hover so the revealed copy stays readable */}
                <motion.div
                    className="pointer-events-none absolute inset-0 bg-black"
                    initial="rest"
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 0.28 } }}
                    transition={{ duration: 0.35 }}
                />

                {/* mesh accent, bottom-left */}
                <div className="absolute -bottom-2 -left-2 w-16 h-16 text-white/60">
                    <GrilleMesh opacity={0.4} />
                </div>

                {/* top row: label + tag badges (always visible) */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${labelColors[label] ?? 'bg-white/90 text-gray-700'}`}>
                        {label}
                    </span>
                    <span
                        className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-sm ${tagColors[tag] ?? 'bg-white/10 text-white ring-1 ring-white/25'}`}
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        {tag}
                    </span>
                </div>

                {/* bottom info block: title always visible, description + spec reveal on hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <motion.h3
                        className="text-xl sm:text-2xl font-semibold text-white leading-snug drop-shadow-sm"
                        style={{ fontFamily: 'var(--font-display)' }}
                        initial="rest"
                        variants={{ rest: { y: 0 }, hover: { y: -2 } }}
                        transition={{ duration: 0.3 }}
                    >
                        {title}
                    </motion.h3>

                    <motion.div
                        className="overflow-hidden"
                        initial="rest"
                        variants={{
                            rest: { height: 0, opacity: 0 },
                            hover: { height: 'auto', opacity: 1 },
                        }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-white/85 text-sm leading-relaxed mt-2 pt-2 border-t border-white/15">
                            {description}
                        </p>
                        <div
                            className="flex items-center justify-between gap-2 text-[11px] text-white/70 uppercase tracking-wider mt-3"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E3A008]" />
                                {spec}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-white font-medium normal-case tracking-normal">
                                <Expand size={12} strokeWidth={2.25} />
                                View gallery
                            </span>
                        </div>
                    </motion.div>
                </div>
            </button>
        </motion.div>
    )
}

// Fullscreen lightbox gallery — browse every product image, arrows + keyboard + swipe
const Lightbox = ({
    index,
    onClose,
    onNavigate,
}: {
    index: number
    onClose: () => void
    onNavigate: (i: number) => void
}) => {
    const item = productList[index]
    const total = productList.length

    const goNext = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate])
    const goPrev = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate])

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight') goNext()
            if (e.key === 'ArrowLeft') goPrev()
        }
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
        }
    }, [onClose, goNext, goPrev])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#0E1013]/97 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Product image gallery"
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 text-white shrink-0">
                <span className="text-xs sm:text-sm tracking-widest uppercase text-white/60" style={{ fontFamily: 'var(--font-mono)' }}>
                    {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Close gallery"
                >
                    <X size={22} strokeWidth={1.75} />
                </button>
            </div>

            {/* Image stage */}
            <div className="relative flex-1 flex items-center justify-center px-3 sm:px-16 pb-4 sm:pb-8 min-h-0">
                <button
                    type="button"
                    onClick={goPrev}
                    className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Previous image"
                >
                    <ChevronLeft size={28} strokeWidth={1.5} />
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.6}
                        onDragEnd={(_, info) => {
                            if (info.offset.x < -80) goNext()
                            else if (info.offset.x > 80) goPrev()
                        }}
                        className="flex flex-col items-center max-w-3xl w-full"
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="max-h-[52vh] sm:max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-2xl mx-auto select-none"
                            draggable={false}
                        />
                        <div className="mt-4 sm:mt-6 text-center px-4">
                            <h4 className="text-white text-lg sm:text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                                {item.title}
                            </h4>
                            <p className="text-white/60 text-sm mt-1 max-w-md mx-auto">{item.description}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <button
                    type="button"
                    onClick={goNext}
                    className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Next image"
                >
                    <ChevronRight size={28} strokeWidth={1.5} />
                </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 pb-5 sm:pb-8 overflow-x-auto shrink-0">
                {productList.map((p, i) => (
                    <button
                        key={p.id}
                        onClick={() => onNavigate(i)}
                        className={`shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden ring-2 transition-all ${
                            i === index ? 'ring-[#E3A008] opacity-100' : 'ring-transparent opacity-45 hover:opacity-75'
                        }`}
                        aria-label={`Show ${p.title}`}
                    >
                        <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* Mobile prev/next bar (arrows hidden on small screens above) */}
            <div className="flex sm:hidden justify-between px-6 pb-5">
                <button onClick={goPrev} className="text-white/70 p-2" aria-label="Previous image">
                    <ChevronLeft size={22} />
                </button>
                <button onClick={goNext} className="text-white/70 p-2" aria-label="Next image">
                    <ChevronRight size={22} />
                </button>
            </div>
        </motion.div>
    )
}

const Products = () => {
    const ref = React.useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })
    const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)

    return (
        <section id="products" className={`${oswald.variable} ${inter.variable} ${plexMono.variable}`}>
            <div
                className="px-5 py-14 sm:px-10 sm:py-16 md:px-16 lg:px-20 md:py-20 bg-[#EFEDE7] relative overflow-hidden"
                style={{ fontFamily: 'var(--font-body)' }}
            >
                {/* Ambient mesh watermark, top-right of section */}
                <div className="pointer-events-none absolute -top-10 -right-10 w-64 h-64 text-[#15181C]/[0.05] hidden sm:block">
                    <GrilleMesh opacity={1} />
                </div>

                {/* Header */}
                <motion.div
                    ref={ref}
                    variants={headerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="relative max-w-2xl"
                >
                    <motion.p
                        variants={headerItemVariants}
                        className="text-[#B87E00] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-2"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        Product Catalogue
                    </motion.p>

                    <motion.h1
                        variants={headerItemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#15181C] leading-[1.1]"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Safety nets and grills for every space in your home
                    </motion.h1>

                    <motion.p variants={headerItemVariants} className="text-[#5B6069] mt-3 sm:mt-4 text-base sm:text-lg">
                        MS, SS &amp; iron grills built for Indian homes — balconies, windows, doors, and staircases. Tap
                        any piece to browse it full-screen.
                    </motion.p>

                    <motion.div
                        className="mt-5 sm:mt-6 h-[3px] w-14 bg-[#E3A008] rounded-full"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                </motion.div>

                {/* Product grid — responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
                <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 mt-9 sm:mt-12">
                    {productList.map((item, i) => (
                        <ProductItemCard key={item.id} item={item} index={i} onOpen={setLightboxIndex} />
                    ))}
                </div>
            </div>

            {/* Lightbox gallery */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        index={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                        onNavigate={setLightboxIndex}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

export default Products