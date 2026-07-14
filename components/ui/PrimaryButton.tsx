"use client"

import React, { useState } from 'react'

interface IPrimaryButton{
    title:string ;
    backgroundColor:string;
    textColor:string; 
    onClick?:()=>void ;
    textSize?:number ; 
    hoverBackgroundColor?:string;
    hoverTextColor?:string;
    onHoverInteracte?:boolean;
    icon?:React.ReactNode;
    outline?:boolean
}

const PrimaryButton = ({
  title,
  backgroundColor,
  textColor,
  onClick,
  textSize,
  hoverBackgroundColor,
  hoverTextColor,
  onHoverInteracte , 
  icon , 
  outline
}: IPrimaryButton) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      style={{
        backgroundColor: isHovered ? (hoverBackgroundColor ?? backgroundColor) : (backgroundColor ?? "black"),
        color: isHovered && hoverTextColor ? hoverTextColor : textColor ?? "white",
        fontSize: textSize,
        transform: isHovered && onHoverInteracte ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px' ,
        borderColor:backgroundColor, 
        borderWidth:2
      }}
      className="px-5 py-5 font-bold rounded-xl justify-center mt-5 w-full"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      {title}
    </button>
  )
}

export default PrimaryButton
