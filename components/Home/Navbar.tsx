import React, { SetStateAction, useState } from 'react'
import CustomButton from '../ui/CustomButton';
import { motion } from 'framer-motion';
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

interface INavigationList {
    label:string ;
    link:string 
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

const navigationList: INavigationList[] = [
    {
        label: "Home",
        link: "home"
    },
    {
        label: "Products",
        link: "products"
    },
    {
        label: "Why Us",
        link: "why-us"
    },
    {
        label: "Testimonial",
        link: "testimonial"
    },
    {
        label: "Contact Us",
        link: "contact-us"
    },
    
]


  interface ISiderbar{
    setIsOpen:React.Dispatch<SetStateAction<boolean>>;
  }

  const SideBar = ({setIsOpen}:ISiderbar) => {
    const sidebarVariants = {
      hidden: { x: '-100%', opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
      exit: { x: '-100%', opacity: 0, transition: { duration: 0.3 } }
    };

    const itemVariants = {
      hidden: { opacity: 0, x: -20 },
      visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.1, duration: 0.2 }
      })
    };

    return (
      <motion.div
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className='fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 p-10 shadow-olive-600'
      >
        <div className='flex flex-row justify-between items-center'>
          <h1>LNS InviShield Grills</h1>
          <button className='absolute top-10 right-5' onClick={()=>setIsOpen(false)}><IoClose size={23} /></button>
        </div>
        <div className='flex flex-col gap-4 p-4'>
          {navigationList.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={()=>{
                setIsOpen(false)
                scrollToSection(item.link)
              }}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={i}
              className='text-lg text-gray-700 hover:text-black'
            >
              {item.label}
            </motion.button>
          ))}
          <CustomButton title='Get Brocher' />
        </div>
      </motion.div>
    );
  };


  interface INavbar{
    isOpen:boolean ;
    setIsOpen:React.Dispatch<SetStateAction<boolean>>;
  }

const Navbar = ({isOpen , setIsOpen}:INavbar) => {

  return (
    <>
    {isOpen && <SideBar setIsOpen={setIsOpen}/>}
    <div className='p-7  shadow-gray-400 shadow-2xs flex flex-row justify-between items-center'>
      <div className="flex flex-row gap-2">
        <h1 className='font-extrabold text-black space-x-1 text-3xl'>LNS InviShield</h1>
        <h1 className='font-bold text-gray-600 space-x-4 text-3xl'>Grills</h1>
      </div>
      <ul className='flex-row gap-7 text-xl text-gray-500 hidden md:flex'>
        {navigationList.map(item=>{
            return <li key={item.label} className='cursor-pointer' onClick={()=>{
              scrollToSection(item.link)
              
            }}>{item.label}</li>
        })}
      </ul>
      <button className='flex md:hidden' onClick={()=>{
        setIsOpen(true)
      }}>
        <IoMdMenu />
      </button>
      <div className='hidden md:block'>
        <CustomButton title='Get Brocher' />
      </div>
    </div>
    </>
  )
}

export default Navbar
