"use client"

import React from 'react'
import { motion, useInView , Variants } from 'framer-motion'

interface IProductList {
    imageUrl: string;
    title: string;
    id: string;
    label: string;
    description: string;
    tag: string;
}

const productList: IProductList[] = [
    {
        id: '1',
        imageUrl: '/grills/main1.jpeg',
        title: 'Balcony Grill',
        label: 'Safety',
        description: 'Modern MS grill for balconies with anti-rust coating',
        tag: 'Popular'
    },
    {
        id: '2',
        imageUrl: '/grills/main2.jpeg',
        title: 'Window Grill',
        label: 'Security',
        description: 'Stainless steel grill designed for window safety',
        tag: 'Best Seller'
    },
    {
        id: '3',
        imageUrl: '/grills/main3.jpeg',
        title: 'Door Grill',
        label: 'Protection',
        description: 'Heavy-duty iron grill for main doors',
        tag: 'Premium'
    },
    {
        id: '4',
        imageUrl: '/grills/main4.jpeg',
        title: 'Staircase Grill',
        label: 'Safety',
        description: 'Elegant grill system for staircase railings',
        tag: 'New'
    }
]

const tagColors: Record<string, string> = {
    'Popular': 'bg-blue-100 text-blue-700',
    'Best Seller': 'bg-amber-100 text-amber-700',
    'Premium': 'bg-purple-100 text-purple-700',
    'New': 'bg-green-100 text-green-700',
}

const labelColors: Record<string, string> = {
    'Safety': 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    'Security': 'bg-sky-50 text-sky-600 border border-sky-200',
    'Protection': 'bg-rose-50 text-rose-600 border border-rose-200',
}

const cardVariants:Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.12,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
}

const headerVariants:Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
}

const headerItemVariants:Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
}

const ProductItemCard = ({ imageUrl, title, tag, description, label, id }: IProductList) => {
    const index = parseInt(id) - 1

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            className='bg-white rounded-2xl shadow-md overflow-hidden group cursor-pointer relative'
        >
            {/* Animated border glow on hover */}
            <motion.div
                className='absolute inset-0 rounded-2xl pointer-events-none z-10'
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{ boxShadow: '0 0 0 2px #1f1f1f20, 0 8px 32px rgba(0,0,0,0.10)' }}
            />

            {/* Image */}
            <div className='w-full h-52 overflow-hidden bg-[#F7F7F5] relative'>
                <motion.img
                    src={imageUrl}
                    alt={title}
                    className='w-full h-full object-cover'
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                />

                {/* Tag badge floats over image */}
                <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.12 + 0.3, duration: 0.4 }}
                    className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm ${tagColors[tag] ?? 'bg-gray-100 text-gray-700'}`}
                >
                    {tag}
                </motion.span>
            </div>

            {/* Content */}
            <div className='p-5'>
                {/* Title & Label */}
                <div className='flex items-center gap-3 mb-2'>
                    <h3 className='text-xl font-bold text-black'>{title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${labelColors[label] ?? 'bg-gray-100 text-gray-600'}`}>
                        {label}
                    </span>
                </div>

                {/* Description */}
                <p className='text-gray-500 text-sm mb-5 leading-relaxed'>{description}</p>

                {/* CTA row */}
                <motion.div
                    className='flex items-center gap-3'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.12 + 0.4 }}
                    viewport={{ once: true }}
                >
                  
                </motion.div>
            </div>
        </motion.div>
    )
}

const Products = () => {
    const ref = React.useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id='products'>
        <div className='md:p-20 p-10 bg-[#F7F7F5]'>

            {/* Animated section header */}
            <motion.div
                ref={ref}
                variants={headerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                <motion.p variants={headerItemVariants} className='text-gray-400 text-sm font-semibold uppercase tracking-widest mb-1'>
                    Our Products
                </motion.p>

                <motion.h1
                    variants={headerItemVariants}
                    className='text-3xl font-extrabold text-black mt-1'
                >
                    Grills for every space in your home
                </motion.h1>

                <motion.p
                    variants={headerItemVariants}
                    className='text-gray-500 mt-2 text-lg max-w-xl'
                >
                    MS, SS &amp; iron grills designed for Indian homes — balconies, windows, doors, and staircases.
                </motion.p>

                {/* Animated underline accent */}
                <motion.div
                    className='mt-4 h-1 w-12 bg-black rounded-full'
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.div>

            {/* Product grid */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-10'>
                {productList.map(item => (
                    <ProductItemCard key={item.id} {...item} />
                ))}
            </div>
        </div>
        </section>
    )
}

export default Products