"use client"

import React from 'react'
import { motion, AnimatePresence, useInView, cubicBezier, Variants } from 'framer-motion'
import PrimaryButton from '../ui/PrimaryButton'
import { FaWhatsapp } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";

interface ISlideAnimation {
  images: string[]
}

const SlideAnimation = ({ images }: ISlideAnimation) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(1)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) =>
      newDirection === 1
        ? (prev + 1) % images.length
        : prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: cubicBezier(0.32, 0.72, 0, 1) },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5, ease: cubicBezier(0.32, 0.72, 0, 1) },
    }),
  }

  return (
    <div className='relative w-full h-64 sm:h-80 lg:h-[480px] overflow-hidden rounded-2xl shadow-2xl'>
      <AnimatePresence custom={direction} initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`slide-${currentIndex}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className='absolute w-full h-full object-cover'
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl pointer-events-none' />

      {/* Nav buttons */}
      {[-1, 1].map((dir) => (
        <motion.button
          key={dir}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.75)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(dir)}
          className={`absolute ${dir === -1 ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors`}
        >
          {dir === -1 ? '❮' : '❯'}
        </motion.button>
      ))}

      {/* Dot indicators */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            animate={{
              width: index === currentIndex ? 24 : 8,
              backgroundColor: index === currentIndex ? '#ffffff' : '#9ca3af',
            }}
            transition={{ duration: 0.3 }}
            className='h-2 rounded-full'
          />
        ))}
      </div>
    </div>
  )
}

// Staggered text reveal animation
const containerVariants:Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants:Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const imageVariants:Variants = {
  hidden: { opacity: 0, x: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
}

const LandingPage = () => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="home">
      <div className='grid grid-cols-1 lg:grid-cols-2 p-6 sm:p-8 lg:p-12 gap-8'>

        {/* LEFT: Text content with stagger */}
        <motion.div
          className='order-2 lg:order-1 p-4 sm:p-6 lg:p-10 flex flex-col justify-center gap-5'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <motion.p
              className='self-start bg-gray-200 px-4 py-2 rounded-2xl text-center whitespace-nowrap text-sm sm:text-base'
              whileHover={{ scale: 1.03, backgroundColor: '#e5e7eb' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              India's Trusted Grill Fabricators since year
            </motion.p>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants}>
            <p className='font-extrabold text-3xl sm:text-4xl lg:text-5xl text-black leading-tight'>
              Safe &amp; Strong<br />
              Grills for Your{' '}
              <motion.span
                className='text-gray-500'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Home
              </motion.span>
            </p>
          </motion.div>

          {/* Subtext */}
          <motion.div variants={itemVariants}>
            <p className='text-gray-500 text-base sm:text-lg lg:text-xl'>
              Insinvishield grills offer a modern, clean look with strong stainless steel cables for safety. Perfect as invisible grills for balcony in Bangalore and safety grills for balcony, they blend easily with any home interior.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className='flex flex-col items-stretch gap-4'
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <PrimaryButton
                backgroundColor='#25D366'
                textColor='white'
                title='WhatsApp Us - Get Free Quotes'
                textSize={16}
                onHoverInteracte
                icon={<FaWhatsapp size={20} />}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <PrimaryButton
                backgroundColor='black'
                textColor='white'
                title='call:+918144725876'
                textSize={16}
                hoverBackgroundColor='white'
                hoverTextColor='black'
                icon={<IoCallOutline size={20} />}
              />
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className='flex gap-6 mt-2'
            variants={itemVariants}
          >
            {['500+ Installs', '4.9★ Rating', '5yr Warranty'].map((badge) => (
              <motion.div
                key={badge}
                className='text-center'
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className='text-xs font-semibold text-gray-800'>{badge}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Image slider */}
        <motion.div
          className='order-1 lg:order-2 flex items-center justify-center w-full'
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className='w-full'>
            <SlideAnimation images={[
              '/grills/main1.jpeg',
              '/grills/main2.jpeg',
              '/grills/main3.jpeg',
              '/grills/main4.jpeg',
              '/grills/main5.jpeg',
            ]} />
          </div>
        </motion.div>
      </div>

      {/* Scrolling ticker */}
      <motion.div
        ref={ref}
        className='w-full bg-black py-4 overflow-hidden'
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className='flex gap-12 animate-ticker whitespace-nowrap'>
          {[...Array(2)].flatMap((_, i) =>
            [
              '✓ Strong Grills – Just Make a Call',
              '✓ Free Home Visit – No Money Required',
              '✓ Trusted by Thousands – Call Now',
              '✓ Quality Grills at Low Price',
            ].map((text, j) => (
              <span
                key={`${i}-${j}`}
                className='shrink-0 text-white text-lg sm:text-xl font-semibold tracking-wide'
              >
                {text}
              </span>
            ))
          )}
        </div>

        <style jsx>{`
          @keyframes ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-ticker {
            animation: ticker 22s linear infinite;
          }
          .animate-ticker:hover {
            animation-play-state: paused;
          }
        `}</style>
      </motion.div>
    </section>
  )
}

export default LandingPage