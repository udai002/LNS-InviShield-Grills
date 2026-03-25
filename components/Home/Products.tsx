import React from 'react'

interface IProductList{
    imageUrl:string ;
    title:string ;
    id:string ;
    label:string;
    description:string ,
    price:string;
    tag:string
}

const productList: IProductList[] = [
    {
        id: '1',
        imageUrl: '/grills/griil1.webp',
        title: 'Balcony Grill',
        label: 'Safety',
        description: 'Modern MS grill for balconies with anti-rust coating',
        price: '₹5,999',
        tag: 'Popular'
    },
    {
        id: '2',
        imageUrl: '/grills/griil2.webp',
        title: 'Window Grill',
        label: 'Security',
        description: 'Stainless steel grill designed for window safety',
        price: '₹3,499',
        tag: 'Best Seller'
    },
    {
        id: '3',
        imageUrl: '/grills/grill3.webp',
        title: 'Door Grill',
        label: 'Protection',
        description: 'Heavy-duty iron grill for main doors',
        price: '₹7,999',
        tag: 'Premium'
    },
    {
        id: '4',
        imageUrl: '/grills/grill3.webp',
        title: 'Staircase Grill',
        label: 'Safety',
        description: 'Elegant grill system for staircase railings',
        price: '₹4,499',
        tag: 'New'
    }
]



const ProductItemCard = ({ imageUrl, title, tag, description, price, label }: IProductList) => {
    return (
        <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow'>
            {/* Image */}
            <div className='w-full h-48 overflow-hidden bg-[#F7F7F5] p-10'>
            <img 
                src={imageUrl} 
                alt={title}
                className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
            />
            </div>
            
            {/* Tag */}
            <div className='p-4'>
           
          

            {/* Content */}
            <div className='p-4'>
            {/* Title & Label */}
            <div className='flex items-center gap-3 mb-3'>
                <h3 className='text-2xl font-bold text-black'>{title}</h3>
                
                <span className='text-xs bg-[#F7F7F5] text-gray-800 px-2 py-1 rounded'>
                {label}
                </span>
            </div>

            {/* Description */}
            <p className='text-gray-600 text-base mb-4'>{description}</p>

            {/* Price */}
            <div className='flex flex-row gap-2 items-center'>
                <p className='text-3xl font-bold text-black'>{price}</p>
             <span className='bg-[#F7F7F5] text-sm font-bold px-3 py-1 rounded-full'>
                {tag}
            </span>
            </div>
            
            </div>
              </div>
        </div>
    )
}

const Products = () => {
  return (
    <div className='md:p-20 p-10 bg-[#F7F7F5]'>
    <h1 className='text-gray-500 space-x-3'>Our products</h1>
    <h1 className='text-3xl font-extrabold text-black mt-3'>Grills for every space in your home</h1>
    <p className='text-gray-500 mt-2 text-xl'>MS, SS & iron grills designed for Indian homes — balconies, windows, doors, and staircases.</p>
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3 mt-8'>
        {productList.map(item=><ProductItemCard key={item.id} {...item}/>)}

    </div>
    </div>
  )
}

export default Products
