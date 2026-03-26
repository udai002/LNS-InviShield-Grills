"use client"

import React from 'react'

interface IFloatingButton{
  title?:string, 
  icon?: React.ReactNode,
  image?:string , 
  background?:string ;
  onClick?:()=>void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
}

const FloatingButton = ({background , icon , image ,title , onClick, position = 'bottom-right', theme = 'light'}:IFloatingButton) => {
  const positionClasses = {
  'bottom-right': 'bottom-8 right-8',
  'bottom-left': 'bottom-8 left-8',
  'top-right': 'top-8 right-8',
  'top-left': 'top-8 left-8'
  }

  const themeClasses = theme === 'dark' 
    ? 'bg-black text-white' 
    : 'bg-white text-black'

  return (
  <button 
    onClick={onClick}
    className={`fixed ${positionClasses[position]} p-2 flex justify-center items-center rounded-full z-50 shadow-lg hover:shadow-xl transition-shadow ${themeClasses}`}
    style={{ backgroundColor: background }}
  >
    {title && <span className='p-3'>{title}</span>}
    {icon && <span>{icon}</span>}
    {image && <img src={image} alt={title || 'button'} className="w-12 h-12 md:w-20 md:h-20 object-cover" />}
  </button>
  )
}

export default FloatingButton
