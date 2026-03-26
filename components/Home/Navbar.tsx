import React from 'react'
import CustomButton from '../ui/CustomButton';


interface INavigationList {
    label:string ;
    link:string 
}

const navigationList: INavigationList[] = [
    {
        label: "Home",
        link: "/home"
    },
    {
        label: "Products",
        link: "/products"
    },
    {
        label: "Testimonial",
        link: "/testimonial"
    },
    {
        label: "Contact Us",
        link: "/contact-us"
    },
    {
        label: "Why Us",
        link: "/why-us"
    }
]

const SideBar = ()=>{
  return <div></div>
}

const Navbar = () => {
  return (
    <div className='p-7  shadow-gray-400 shadow-2xs flex flex-row justify-between items-center'>
      <div className="flex flex-row gap-2">
        <h1 className='font-extrabold text-black space-x-1 text-3xl'>LNS InviShield</h1>
        <h1 className='font-bold text-gray-600 space-x-4 text-3xl'>Grills</h1>
      </div>
      <ul className='flex-row gap-7 text-xl text-gray-500 hidden md:flex'>
        {navigationList.map(item=>{
            return <li key={item.label} className='cursor-pointer'>{item.label}</li>
        })}
      </ul>
      <div className='hidden md:block'>
        <CustomButton title='Get Brocher' />
      </div>
    </div>
  )
}

export default Navbar
