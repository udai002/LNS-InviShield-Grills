"use client"

import DataTable from "@/components/Admin/DataTable";
import ImageUploadModal from "@/components/Admin/ImageUploadModal";
import AdminLayout from "@/components/navigations/AdminLayout";
import { useGetGalleryQuery } from "@/redux/GallerySlice";
import { useLazyGetLocationsQuery } from "@/redux/locationSlice";
import { useEffect, useState } from "react";

export default function Gallery(){
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [isOpen , setIsOpen]= useState(false)

    console.log(location)
    const {data , isLoading} = useGetGalleryQuery(location)

    const [getLocations , {data:locations , isLoading:locationLoading , isError}] = useLazyGetLocationsQuery()

    useEffect(()=>{
        getLocations()
    } , [data])

    function onClose(){
        setIsOpen(false)
    }
    console.log("this is gallery data" , data)

    return <AdminLayout>
        <ImageUploadModal isOpen={isOpen} onClose={onClose} />
        <div className="p-6 scroll-auto">
            <div className="flex gap-4 mb-6">
            <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                >
                    <option value="" >All</option>
                    {locations && locations.map((item:any)=>  <option key={item._id} value={item._id} >{`${item.state}-${item.city}`}</option>)}
                  
                </select>
                {/* <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                >
                    <option value="">All Locations</option>
                    <option value="balcony">Balcony</option>
                    <option value="grill">Grill</option>
                </select> */}
                <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-500" onClick={()=>setIsOpen(true)}>
                    + Add Image
                </button>
            </div>
            <div>
            {isLoading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data?.map((item: any) => (
                        <div key={item._id} className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer">
                            <img
                            key={item._id}
                                src={item.imageUrl}
                                alt="Gallery"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                {/* <button className="bg-white text-black px-3 py-1 rounded text-sm hover:bg-gray-200">Edit</button> */}
                                {/* <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Delete</button> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    </AdminLayout>
}
