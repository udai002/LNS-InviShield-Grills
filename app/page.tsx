"use client"

import ContactUs from "@/components/Home/ContactUs";
import LandingPage from "@/components/Home/LandingPage";
import Navbar from "@/components/Home/Navbar";
import Products from "@/components/Home/Products";
import Testimonial from "@/components/Home/Testimonial";
import FeatureCards from "@/components/Home/WeAreBest";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import FloatingButton from "@/components/ui/FloatingButton";
import Image from "next/image";
import { useState } from "react";
import { IoCall } from "react-icons/io5";
import { Provider } from 'react-redux';
import { motion } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa"
import { IoCallOutline } from "react-icons/io5"
import store from "@/store";


const BrocherIcon = ()=>{
  return (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
}

export default function Home() {
  const [isMenu , setIsOpen] = useState(false);

  return (<>
  
        <FloatingButton image="data:image/webp;base64,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"
        onClick={()=>{
          window.open('https://wa.me/918144725876', '_blank');
        }}
        />
         <FloatingButton icon={<IoCall size={23}/>}
         theme="dark"
        onClick={()=>{
            window.location.href = 'tel:918144725876';
        }}
        position="bottom-right-12"
        />
        {/* <FloatingButton title="Download brocher" position="bottom-left" theme="dark" onClick={
          () => {
            const link = document.createElement('a');
            link.href = '/Brocher.pdf';
            link.download = 'Brocher';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }/> */}
    <div className="">

      {/* Navbar  */}
      <Navbar isOpen={isMenu} setIsOpen={setIsOpen}/>

      {/* landing page  */}
      <LandingPage/>

      {/* products  */}
      <Products/>
      <FeatureCards/>
      {/* why choose us  */}
      <WhyChooseUs/>
      {/* testimonial  */}
      <Testimonial/>
      {/* contact us footer  */}
      <ContactUs/>
    </div>
    </>
  );
}
