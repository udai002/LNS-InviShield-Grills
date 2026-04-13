import React from 'react'

interface ICustomButton {
  title: string
  onClick?: () => void
  disabled: boolean
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
}

const CustomButton = ({ title, onClick, disabled, type = 'button', loading }: ICustomButton) => {
  return (
  <button 
    className="bg-black px-5 py-4 font-bold text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed" 
    onClick={onClick} 
    disabled={disabled || loading}
    type={type}
  >
    {loading ? 'Loading...' : title}
  </button>
  )
}

export default CustomButton
