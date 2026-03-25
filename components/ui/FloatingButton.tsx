import React from 'react'

interface IFloatingButton{
    title?:string, 
    icon?: React.ReactNode,
    image?:string , 
    background?:string
}

const FloatingButton = ({background , icon , image ,title}:IFloatingButton) => {
  return (
    <button 
      className="fixed bottom-8 right-8 p-4 flex justify-center items-center rounded-full z-50  shadow-lg hover:shadow-xl transition-shadow bg-[white]"
      style={{ backgroundColor: background }}
    >
      {title && <span>{title}</span>}
      {icon && <span>{icon}</span>}
      {image && <img src={image} alt={title || 'button'} className="w-20 h-20 object-cover" />}
    </button>
  )
}

export default FloatingButton
