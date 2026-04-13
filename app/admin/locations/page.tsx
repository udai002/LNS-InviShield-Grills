'use client';

import DataTable from "@/components/Admin/DataTable";
import FormModal from "@/components/Admin/FormModal";
import AdminLayout from "@/components/navigations/AdminLayout";
import { useLazyGetLocationsQuery } from "@/redux/locationSlice";
import { useEffect, useState } from "react";

export default function Location() {


    const [isOpen , setIsOpen] = useState(false)
    
    function onClose(){
        setIsOpen(false)
    }

    const [getLocations, { data, isLoading }] = useLazyGetLocationsQuery();

    // ✅ Trigger API
    useEffect(() => {
        getLocations();
    }, []);

    // ✅ Define table columns
    const columns = [
        {
            key: "city",
            label: "City",
        },
        {
            key: "area",
            label: "Area",
        },
        {
            key: "state",
            label: "State",
        },
        {
            key: "pincode",
            label: "Pincode",
        },
        {
            key: "description",
            label: "Description",
        },
        {
            key: "_id",
            label: "Actions",
            render: (_: any, row: any) => (
                <div className="flex gap-2">
                    <button className="text-blue-500">Edit</button>
                    <button className="text-red-500">Delete</button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout>
            <FormModal isOpen={isOpen} close={onClose} />
            <div className="p-10">

                {/* Header */}
                <div className="flex flex-row justify-between items-center mb-6">
                    <div className="flex-1">
                        <input
                            type="search"
                            className="w-full max-w-md px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-600 focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-10 transition-all"
                            placeholder="Search locations..."
                        />
                    </div>

                    <button
                    onClick={()=>setIsOpen(true)}
                    className="ml-4 px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl active:scale-95">
                        + Add Location
                    </button>
                </div>

                {/* Table */}
                <div className="scroll-auto">
                    <DataTable
                    columns={columns}
                    data={data || []}
                    loading={isLoading}
                    keyExtractor={(row: any) => row._id}
                />

                </div>
                
            </div>
        </AdminLayout>
    );
}