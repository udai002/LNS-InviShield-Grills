import React from 'react'

interface ICustomButton {
    title:string , 
    onClick?:()=>void 
}

const CustomButton = ({title}:ICustomButton) => {
  return (
    <button className="bg-black px-5 py-4 font-bold text-white rounded-md">
        {title}
    </button>
  )
}

export default CustomButton
