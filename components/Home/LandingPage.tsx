"use client"

import React from 'react'
import PrimaryButton from '../ui/PrimaryButton'
import { FaWhatsapp } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";

interface ISlideAnimation{
  images:string[]
}

const SlideAnimation = ({ images }: ISlideAnimation) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className='relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg'>
      <div className='relative w-full h-full'>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`slide-${index}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() =>
          setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          )
        }
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75'
      >
        ❮
      </button>

      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev + 1) % images.length)
        }
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75'
      >
        ❯
      </button>

      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-6' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const LandingPage = () => {
  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-2 p-6 sm:p-8 lg:p-12 gap-8'>
      <div className='order-2 lg:order-1 p-4 sm:p-6 lg:p-10 flex flex-col justify-center gap-5'>
        <div className='bg-gray-200 p-4 w-full sm:w-3/4 lg:w-1/2 rounded-2xl text-center'>
          <p className='whitespace-nowrap text-sm sm:text-base'>India's Trusted Grill Fabricators since year</p>
        </div>

        <div className=''>
          <p className='font-extrabold text-3xl sm:text-4xl lg:text-5xl text-black '>Safe & Strong
            Grills for Your <span className='text-gray-500'>Home</span></p>
        </div>

        <div>
          <p className='text-gray-500 text-base sm:text-lg lg:text-xl'>We make and install grills for balconies, windows, doors and staircases. Good quality. Low price. Free home visit.</p>
        </div>

        <div className='flex flex-col items-stretch gap-4'>
          <PrimaryButton backgroundColor='#25D366' textColor='white' title='WhatsApp Us - Get Free Quotes' textSize={16} onHoverInteracte icon={<FaWhatsapp size={20} />}/>
          <PrimaryButton backgroundColor='black' textColor='white' title='call:+918144725876' textSize={16} hoverBackgroundColor='white' hoverTextColor='black' icon={<IoCallOutline size={20}/>} />
        </div>
      </div>
      <div className='order-1 lg:order-2 flex items-center justify-center w-full'>
        <SlideAnimation images={[
          '/balcony1.webp',
          '/balcony2.webp',
          '/balcony3.webp',
          '/balcony4.webp'
        ]} />
      </div>
    </div>
    <div>
      <div className='w-full bg-black py-4 overflow-hidden'>
        <div className='flex animate-scroll whitespace-nowrap gap-8 px-8'>
          <div className='shrink-0 text-white text-lg sm:text-xl lg:text-xl font-semibold'>
            ✓ Strong Grills - Just Make a Call
          </div>
          <div className='shrink-0 text-white text-lg sm:text-xl lg:text-xl font-semibold'>
            ✓ Free Home Visit - No Money Required
          </div>
          <div className='shrink-0 text-white text-lg sm:text-xl lg:text-xl font-semibold'>
            ✓ Trusted by Thousands - Call Now
          </div>
          <div className='shrink-0 text-white text-lg sm:text-xl lg:text-xl font-semibold'>
            ✓ Quality Grills at Low Price
          </div>
          <div className='shrink-0 text-white text-lg sm:text-xl lg:text-xl font-semibold'>
            ✓ Strong Grills - Just Make a Call
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
        `}</style>
      </div>
    </div>
    </>
  )
}

export default LandingPage
