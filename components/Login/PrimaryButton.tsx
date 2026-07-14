import React from 'react'

interface IPrimaryButton{
    title:string ;
    icon?:React.ReactNode;
    onClick?:()=>void, 
    loading?:boolean , 
    disabled?:boolean
}

const PrimaryButton = ({title, disabled, icon, loading, onClick}:IPrimaryButton) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            {loading ? (
                <span className="animate-spin">⏳</span>
            ) : (
                icon
            )}
            {title}
        </button>
    )
}

export default PrimaryButton
