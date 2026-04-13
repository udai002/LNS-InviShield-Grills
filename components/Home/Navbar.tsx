import React, { SetStateAction, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'// or: import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdArrowDropdown, IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { useLazyGetLocationsQuery } from '@/redux/locationSlice';

interface INavigationList {
  label: string;
  link: string;
}

interface ILocation {
  _id: string;
  city: string;
  area: string;
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

const navigationList: INavigationList[] = [
  { label: "Home", link: "home" },
  { label: "Products", link: "products" },
  { label: "Why Us", link: "why-us" },
  { label: "Testimonial", link: "testimonial" },
  { label: "Contact Us", link: "contact-us" },
]

// ── Locations Dropdown (Desktop) ──────────────────────────────────────────────
interface ILocationsDropdown {
  locations: ILocation[];
  isLoading: boolean;
  isError: boolean;
}

const LocationsDropdown = ({ locations, isLoading, isError }: ILocationsDropdown) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  const router = useRouter() // replace with: const navigate = useNavigate() for React Router

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLocationClick = (id: string) => {
    setIsOpen(false)
    router.push(`/location/${id}`)         // Next.js
    // navigate(`/location/${id}`)         // React Router — swap if needed
  }

  return (
    <li
      ref={ref}
      className="relative flex items-center gap-1 cursor-pointer select-none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="flex items-center gap-1">
        Locations
        <IoMdArrowDropdown
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="
              absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50
              bg-white border border-gray-200 rounded-xl shadow-lg
              w-[220px] sm:w-[280px] md:w-[320px] lg:w-[380px]
              overflow-hidden
            "
          >
            {isLoading && (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">
                Loading locations...
              </li>
            )}

            {isError && (
              <li className="px-4 py-3 text-sm text-red-400 text-center">
                Failed to load locations
              </li>
            )}

            {!isLoading && !isError && locations.map((item, i) => (
              <li
                key={item._id}
                onClick={() => handleLocationClick(item._id)}
                className={`
                  flex items-start gap-3 px-4 py-3 cursor-pointer
                  hover:bg-gray-50 transition-colors
                  ${i !== locations.length - 1 ? 'border-b border-gray-100' : ''}
                `}
              >
                <IoLocationSharp className="text-green-600 mt-0.5 shrink-0" size={16} />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Invisible Grills {item.city}</p>
                  <p className="text-gray-500 text-xs leading-snug">{item.area}</p>
                </div>
              </li>
            ))}

            {!isLoading && !isError && locations.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">
                No locations found
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

// ── Locations Accordion (Sidebar / Mobile) ────────────────────────────────────
interface ISidebarLocations {
  locations: ILocation[];
  isLoading: boolean;
  isError: boolean;
  onNavigate: (id: string) => void; // closes sidebar then navigates
}

const SidebarLocations = ({ locations, isLoading, isError, onNavigate }: ISidebarLocations) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center justify-between w-full text-lg text-gray-700 hover:text-black py-1"
      >
        <span className="flex items-center gap-1">
          <IoLocationSharp size={16} />
          Locations
        </span>
        <IoMdArrowDropdown
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-4 mt-1"
          >
            {isLoading && (
              <li className="py-2 text-sm text-gray-400">Loading...</li>
            )}

            {isError && (
              <li className="py-2 text-sm text-red-400">Failed to load locations</li>
            )}

            {!isLoading && !isError && locations.map((loc, i) => (
              <li
                key={loc._id}
                onClick={() => onNavigate(loc._id)}
                className={`
                  flex items-start gap-2 py-2 text-sm cursor-pointer
                  hover:text-black transition-colors
                  ${i !== locations.length - 1 ? 'border-b border-gray-100' : ''}
                `}
              >
                <IoLocationSharp className="text-gray-400 mt-0.5 shrink-0" size={13} />
                <div>
                  <p className="font-semibold text-gray-700">Invisible Grills {loc.city}</p>
                  <p className="text-gray-500 text-xs leading-snug">{loc.area}</p>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
interface ISidebar {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  locations: ILocation[];
  isLoading: boolean;
  isError: boolean;
}

const SideBar = ({ setIsOpen, locations, isLoading, isError }: ISidebar) => {
  const router = useRouter()  // or: const navigate = useNavigate()

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1, x: 0,
      transition: { delay: i * 0.1, duration: 0.2 }
    })
  }

  const handleLocationNavigate = (id: string) => {
    setIsOpen(false)
    router.push(`/location/${id}`)    // Next.js
    // navigate(`/location/${id}`)    // React Router
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 z-30"
        onClick={() => setIsOpen(false)}
      />

      <motion.div
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-y-0 left-0 w-72 bg-white shadow-lg z-40 p-6 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <img src="/logogrills.jpeg" alt="logo grills" width={80} />
          <button onClick={() => setIsOpen(false)}>
            <IoClose size={32} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {navigationList.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => { setIsOpen(false); scrollToSection(item.link) }}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={i}
              className="text-lg text-gray-700 hover:text-black text-left"
            >
              {item.label}
            </motion.button>
          ))}

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={navigationList.length}
          >
            <SidebarLocations
              locations={locations}
              isLoading={isLoading}
              isError={isError}
              onNavigate={handleLocationNavigate}
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────
interface INavbar {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ isOpen, setIsOpen }: INavbar) => {
  // Single source of truth for locations data
  const [getLocations, { data, isLoading, isError }] = useLazyGetLocationsQuery()

  useEffect(() => {
    getLocations()
  }, [])

  const locations: ILocation[] = data ?? []

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <SideBar
            setIsOpen={setIsOpen}
            locations={locations}
            isLoading={isLoading}
            isError={!!isError}
          />
        )}
      </AnimatePresence>

      <div className="p-7 shadow-gray-400 shadow-2xs flex flex-row justify-between items-center relative">
        <div className="flex flex-row gap-2 items-center">
          <img src="/logogrills.jpeg" alt="logo grills" width={100} />
          <h1 className="font-extrabold text-black text-2xl">LNS InviShield</h1>
          <h1 className="font-bold text-gray-600 text-2xl hidden md:block">Grills</h1>
        </div>

        <ul className="flex-row gap-7 text-xl text-gray-500 hidden md:flex items-center">
          {navigationList.map(item => (
            <li
              key={item.label}
              className="cursor-pointer hover:text-black transition-colors"
              onClick={() => scrollToSection(item.link)}
            >
              {item.label}
            </li>
          ))}
          <LocationsDropdown
            locations={locations}
            isLoading={isLoading}
            isError={!!isError}
          />
        </ul>

        <button className="flex md:hidden text-2xl" onClick={() => setIsOpen(true)}>
          <IoMdMenu />
        </button>
      </div>
    </>
  )
}

export default Navbar